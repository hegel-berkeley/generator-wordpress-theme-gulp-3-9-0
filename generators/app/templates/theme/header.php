<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= name %>
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=11,IE=10,IE=9,IE=edge"/>
  <meta charset="<?php bloginfo('charset'); ?>"/>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <title><?php the_title(); ?></title>

  <!-- Favicon -->
  <link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/img/favicons/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_directory'); ?>/img/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/img/favicons/favicon-32x32.png" izes="32x32">
  <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/img/favicons/favicon-16x16.png" sizes="16x16">
  <link rel="mask-icon" href="<?php bloginfo('template_directory'); ?>/img/favicons/safari-pinned-tab.svg" color="#722789">
  <meta name="theme-color" content="#722789">
  <meta name="msapplication-TileColor" content="#722789">
  <?php wp_head(); ?>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 10]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body <?php body_class(); ?> >
