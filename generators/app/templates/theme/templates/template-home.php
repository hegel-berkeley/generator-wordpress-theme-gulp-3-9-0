<?php
/* Template Name: Home */

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
get_footer();
