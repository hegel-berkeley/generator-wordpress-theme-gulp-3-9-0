<?php
// ==== CONFIGURATION (CUSTOM) ==== //

// Specify custom configuration values in this file; these will override values in `functions-config-defaults.php`
// The general idea here is to allow for themes to be customized for specific installations

<%_ if (sidebar) { _%>
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function theme_by_hegel_widgets_init() {
  register_sidebar(
    array(
      'name'          => esc_html__( 'Sidebar', '<%= name %>' ),
      'id'            => 'sidebar-1',
      'description'   => esc_html__( 'Add widgets here.', '<%= name %>' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
}
add_action( 'widgets_init', 'theme_by_hegel_widgets_init' );

function theme_load_widgets() {
  register_widget( 'HegelWidget' );
}
add_action( 'widgets_init', 'theme_load_widgets' );
<%_ } _%>
<%_ if (security) { _%>
/**
 * Add headers security
 */

function add_header_security() {
  header( 'X-Frame-Options: DENY' );
  header( 'Referrer-Policy: no-referrer' );
  header( 'X-Content-Type-Options: nosniff' );
  header( 'Permissions-Policy: microphone=(), geolocation=(self "'.get_site_url().'")' );
  header( 'Strict-Transport-Security: max-age=31536000; includeSubDomains' );
  header( "Content-Security-Policy: style-src * 'unsafe-inline' 'unsafe-eval'; media-src *; img-src * data: blob:; script-src * 'unsafe-inline' 'unsafe-eval';" );
}
add_action( 'send_headers', 'add_header_security', 10, 0 );

/**
 * Remove everything related with emojis
 */
function remove_wp_emojicons() {
  // all actions related to emojis
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
}
add_action( 'init', 'remove_wp_emojicons' );

/**
 * Remove everything related with Embedding in the HTML
 */
function unregister_wp_embed_script() {
  if (!is_admin()) {
    wp_deregister_script('wp-embed');
  }
}
add_action('init', 'unregister_wp_embed_script');

/**
 * Remove the REST API endpoint.
 * Don't filter oEmbed results.
 * Remove oEmbed discovery links.
 * Remove oEmbed-specific JavaScript from the front-end and back-end.
 */

remove_action( 'rest_api_init', 'wp_oembed_register_route' );
add_filter( 'embed_oembed_discover', '__return_false' );
remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );

/**
 * Remove rsd+xml and wlwmanifest+xml.
 * removes feed and comments feed.
 */
remove_action( 'wp_head', 'rsd_link');
remove_action( 'wp_head', 'wlwmanifest_link');
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
add_filter( 'xmlrpc_enabled', '__return_false' );

/**
 * Remove All Meta Generators
 */
remove_action('wp_head', 'wp_generator');

/**
 * Remove wp version rss
 */
function remove_wp_version_rss() {
  return'';
}

add_filter('the_generator','remove_wp_version_rss');


/**
 * Disable REST API link in HTTP headers
 * Link: <https://example.com/wp-json/>; rel="https://api.w.org/"
 */

remove_action('template_redirect', 'rest_output_link_header', 11);

/**
 * Disable REST API links in HTML <head>
 * <link rel='https://api.w.org/' href='https://example.com/wp-json/' />
 */

remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');

/**
 * Disable REST API
 */

if (version_compare(get_bloginfo('version'), '4.7', '>=')) {

  add_filter('rest_authentication_errors', 'disable_wp_rest_api');

} else {

  disable_wp_rest_api_legacy();

}

function disable_wp_rest_api($access) {

  if (!is_user_logged_in() && !disable_wp_rest_api_allow_access()) {

    $message = apply_filters('disable_wp_rest_api_error', __('REST API restricted to authenticated users.', 'disable-wp-rest-api'));

    return new WP_Error('rest_login_required', $message, array('status' => rest_authorization_required_code()));

  }

  return $access;

}

function disable_wp_rest_api_allow_access() {

  $post_var = apply_filters('disable_wp_rest_api_post_var', false);

  if (!empty($post_var)) {

    if (isset($_POST[$post_var]) && !empty($_POST[$post_var])) return true;

  }

  return false;

}

function disable_wp_rest_api_legacy() {

  // REST API 1.x
  add_filter('json_enabled', '__return_false');
  add_filter('json_jsonp_enabled', '__return_false');

  // REST API 2.x
  add_filter('rest_enabled', '__return_false');
  add_filter('rest_jsonp_enabled', '__return_false');

}

/**
 * Remove Gutenberg Block Library CSS from loading on the frontend
 */
function remove_wp_block_library_css(){
  wp_dequeue_style( 'wp-block-library' );
  wp_dequeue_style( 'wp-block-library-theme' );
  wp_dequeue_style( 'wc-block-style' ); // Remove WooCommerce block CSS
}
add_action( 'wp_enqueue_scripts', 'remove_wp_block_library_css', 100 );

/**
 * Remove dns-prefetch Link from WordPress Head (Frontend)
 */
remove_action( 'wp_head', 'wp_resource_hints', 2 );

/**
 *  Remove WP Version From Styles & Scripts
 */
add_filter( 'style_loader_src', 'remove_version_in_css_js', 9999 );
add_filter( 'script_loader_src', 'remove_version_in_css_js', 9999 );

function remove_version_in_css_js( $src ) {
  if ( strpos( $src, 'ver=' ) ) {
    $src = remove_query_arg( 'ver', $src );
  }

  return $src;
}

/**
 * Disable editor Gutenberg
 */

add_filter('use_block_editor_for_post', '__return_false', 10);
/**
 * Disabled search
 */

function disable_search_filter_query( $query, $error = true ) {
  if ( is_search() ) {
    $query->is_search = false;
    $query->query_vars['s'] = false;
    $query->query['s'] = false;

    // to error
    if ( $error == true )
      $query->is_404 = true;
  }
}
add_action( 'parse_query', 'disable_search_filter_query' );

function hide_search_widget() {
  unregister_widget('WP_Widget_Search');
}
add_action( 'widgets_init', 'hide_search_widget' );

/**
 * Disable User Notification of Password Change Confirmation
 */
add_filter( 'send_password_change_email', '__return_false' );


<%_ } _%>
