<?php
# Database Configuration
define('DB_NAME','wp_badracket');
define('DB_USER','badracket');
define('DB_PASSWORD','RxoP48kpxjRryzb1IQHt');
define('DB_HOST','127.0.0.1');
define('DB_HOST_SLAVE','localhost');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', 'utf8_unicode_ci');
$table_prefix = 'wp_';

# Security Salts, Keys, Etc
define('AUTH_KEY',         'mC8-Qr:b0+:pm0htl:|I`qxV$h]wQRV-)`o+UZx8PP-X^#fkJ)*x]VD=_M+,-pdH');
define('SECURE_AUTH_KEY',  'vJZb_0+#+*/Uh|KuFo!3H}H(ip_-IJlcKLc}g~3Kimb0JW@B48A*P6+^^;-^tDY+');
define('LOGGED_IN_KEY',    '}VoRDo8;[9qd7x3zq+MLRKN6>1i--Uh/Q-Vy,ru;Nah36x1unK&52(g0P><|/`eo');
define('NONCE_KEY',        '+mG8w|_-KuMm]L+bg4BfQ+)F#oa%KA?Vvs|~l?<ff!:Vz-a#u0HT@-OY)HezUwUu');
define('AUTH_SALT',        '4f%&A3QMH2T@#-bUA|Xh~yD>(wR:M%ju;Z7@el/E*({s[]<rT2dLzyM5^>U2_2p?');
define('SECURE_AUTH_SALT', 'f$Kx+*-LU,sL.KIwYoeZl0XSd+@40(dTM|*+O@bHZs+1cqK2Aq#y)~20QcBKSTOx');
define('LOGGED_IN_SALT',   ' ]O%EN>ap|s;B/Vc*YJbEPF{B.bR#A#+i@_nYU./*DY2A9bj+js#qt+xuA_]Dv|p');
define('NONCE_SALT',       '{WW}gFVB -M ~#5lBdnoOZ&cam[</Ycy|T5q8E^W]Sk+c0*l7wl-=@96:>dm%rr@');


# Localized Language Stuff

define('WP_CACHE',TRUE);

define('PWP_NAME','badracket');

define('FS_METHOD','direct');

define('FS_CHMOD_DIR',0775);

define('FS_CHMOD_FILE',0664);

define('PWP_ROOT_DIR','/nas/wp');

define('WPE_APIKEY','4253e7979a3512a97d4915438c510f8dc5fc8f1b');

define('WPE_FOOTER_HTML',"");

define('WPE_CLUSTER_ID','1566');

define('WPE_CLUSTER_TYPE','pod');

define('WPE_ISP',true);

define('WPE_BPOD',false);

define('WPE_RO_FILESYSTEM',false);

define('WPE_LARGEFS_BUCKET','largefs.wpengine');

define('WPE_CDN_DISABLE_ALLOWED',true);

define('DISALLOW_FILE_EDIT',FALSE);

define('DISALLOW_FILE_MODS',FALSE);

define('DISABLE_WP_CRON',false);

define('WPE_FORCE_SSL_LOGIN',false);

define('FORCE_SSL_LOGIN',false);

/*SSLSTART*/ if ( isset($_SERVER['HTTP_X_WPE_SSL']) && $_SERVER['HTTP_X_WPE_SSL'] ) $_SERVER['HTTPS'] = 'on'; /*SSLEND*/

define('WPE_EXTERNAL_URL',false);

define('WP_POST_REVISIONS',FALSE);

define('WP_TURN_OFF_ADMIN_BAR',false);

define('WPE_BETA_TESTER',false);

umask(0002);

$wpe_cdn_uris=array ();

$wpe_no_cdn_uris=array ();

$wpe_content_regexs=array ();

$wpe_all_domains=array (  0 => 'badracket.wpengine.com',  1 => 'badracket.com',  2 => 'www.badracket.com',);

$wpe_varnish_servers=array (  0 => 'pod-1566',);

$wpe_ec_servers=array ();

$wpe_largefs=array ();

$wpe_netdna_domains=array ();

$wpe_netdna_push_domains=array ();

$wpe_domain_mappings=array ();

$memcached_servers=array ();
define('WPLANG','');

# WP Engine ID


define('PWP_DOMAIN_CONFIG', 'www.badracket.com' );

# WP Engine Settings






# That's It. Pencils down
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'wp-settings.php');

$_wpe_preamble_path = null; if(false){}
