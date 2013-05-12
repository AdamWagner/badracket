from __future__ import with_statement
from fabric.api import *
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import hashlib
import gzip
import os

# Constants
WP_PATH = 'wp-content/themes/badracket'

# bucket: copilot-fabric-test
ACCESS_KEY = 'AKIAJRITOMRC7WTRLHLQ'
SECRET = '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'
STAGE_BUCKET_NAME = 'badracket-website-staging'
PROD_BUCKET_NAME = 'badracket-website'


def make_filepath(filename, subdirectory):
    return WP_PATH + subdirectory + '/' + filename


def md5_for_filename(filepath, block_size=2 ** 20):
    md5 = hashlib.md5()
    fh = open(filepath, 'rb')
    while True:
        data = fh.read(block_size)
        if not data:
            break
        md5.update(data)
    fh.close()
    return md5.hexdigest()


def versioned_filename_builder(filename, subdirectory):
    filename_parts = filename.split('.')
    extension = filename_parts[1]
    basename = filename_parts[0]

    filepath = make_filepath(filename, subdirectory)
    return '%s.%s.%s.%s' % (basename, md5_for_filename(filepath), 'gzip', extension)


def gzip_assets(filename, subdirectory, env):
    print '**** gzipping ' + filename + '****'
    filepath = make_filepath(filename, subdirectory)

    filename_parts = filename.split('.')
    extension = filename_parts[1]
    basename = filename_parts[0]

    class FakeTime:
        def time(self):
            return 1261130520.0

    # Hack to override gzip's time implementation
    # !! This line made the gzipping NOT decode in the browser.
    # gzip.time = FakeTime()

    gzipped_file_path = WP_PATH + subdirectory + '/' + basename + '.gzip.' + extension

    f_in = open(filepath, 'rb')
    contents = f_in.readlines()
    f_in.close()
    f_out = gzip.open(gzipped_file_path, 'wb')
    f_out.writelines(contents)
    f_out.close()

    save_file_in_s3(filename, subdirectory, env, gzipped_file_path)


def save_file_in_s3(filename, subdirectory, env, gzipped_file_path):
    if env == 'staging':
        BUCKET_NAME = STAGE_BUCKET_NAME
    else:
        BUCKET_NAME = PROD_BUCKET_NAME

    versioned_filename = versioned_filename_builder(filename, subdirectory)

    if subdirectory != '':
        remote_filepath = WP_PATH + subdirectory + '/'
    else:
        remote_filepath = WP_PATH + '/'

    print 'uploading -- %s --  to -- %s --' % (versioned_filename, BUCKET_NAME + ' : ' + remote_filepath)

    #set headers
    # css -> content-type: text/css, content-encoding: gzip
    # js -> content-type: application/javascript, content-encoding: gzip

    conn = S3Connection(ACCESS_KEY, SECRET)
    bucket = conn.get_bucket(BUCKET_NAME)
    k = Key(bucket)
    k.key = remote_filepath + versioned_filename
    k.set_metadata('Content-Encoding', 'gzip')
    k.set_contents_from_filename(gzipped_file_path)
    k.make_public()

    print '**** Deleting ' + gzipped_file_path + '****'
    os.remove(gzipped_file_path)


def deploy(env):
    print '**** Uploading to S3 ****'
    gzip_assets('style.css', '', env)
    gzip_assets('main-min.js', '/js/prod', env)
    print '**** pushing to wp %s ****' % env
    if env == 'staging':	
       local('git push br-staging master')
    else:
       local('git push br-production master')
          
