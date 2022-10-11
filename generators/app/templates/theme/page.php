<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package <%= name %>
 */

get_header();
  while ( have_posts() ) :
    the_post();

    get_template_part( 'templates/partials/content', 'page' );

    <%_ if (comments) { _%>
    // If comments are open or we have at least one comment, load up the comment template.
    if ( comments_open() || get_comments_number() ) :
      comments_template();
    endif;
    <%_ } _%>
  endwhile; // End of the loop.
  <%_ if (sidebar) { _%>
    get_sidebar();
  <%_ } _%>
  wp_footer();
  ?>
</body>
</html>
