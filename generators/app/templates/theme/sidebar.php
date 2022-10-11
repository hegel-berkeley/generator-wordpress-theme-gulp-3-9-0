<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= name %>
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>
<%_ if (sidebar) { _%>
<aside>
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
<%_ } _%>
