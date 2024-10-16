<?php
/**
 * Plugin Name: Quiz Plugin
 * Description: Un plugin de quiz interactif pour WordPress
 * Version: 1.0
 * Author: Votre Nom
 */

if (!defined('ABSPATH')) {
    exit; // Sortie si accès direct
}

// Activation du plugin
function quiz_plugin_activate() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();

    $table_quizzes = $wpdb->prefix . 'quizzes';
    $table_questions = $wpdb->prefix . 'quiz_questions';

    $sql = "CREATE TABLE $table_quizzes (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    $sql .= "CREATE TABLE $table_questions (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        quiz_id mediumint(9) NOT NULL,
        question_text text NOT NULL,
        options text NOT NULL,
        correct_answer tinyint NOT NULL,
        PRIMARY KEY  (id),
        KEY quiz_id (quiz_id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'quiz_plugin_activate');

// Inclure les fichiers nécessaires
require_once(plugin_dir_path(__FILE__) . 'includes/admin-menu.php');
require_once(plugin_dir_path(__FILE__) . 'includes/shortcodes.php');

// Enregistrement des scripts et styles
function quiz_plugin_enqueue_scripts() {
    wp_enqueue_style('quiz-plugin-style', plugin_dir_url(__FILE__) . 'assets/css/quiz-plugin.css');
    wp_enqueue_script('quiz-plugin-script', plugin_dir_url(__FILE__) . 'assets/js/quiz-plugin.js', array('jquery'), '1.0', true);
    wp_localize_script('quiz-plugin-script', 'quiz_plugin_ajax', array('ajax_url' => admin_url('admin-ajax.php')));
}
add_action('wp_enqueue_scripts', 'quiz_plugin_enqueue_scripts');

// Traitement AJAX pour vérifier les réponses
function check_quiz_answers() {
    $quiz_id = intval($_POST['quiz_id']);
    $answers = $_POST['answers'];

    global $wpdb;
    $table_questions = $wpdb->prefix . 'quiz_questions';
    $questions = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table_questions WHERE quiz_id = %d", $quiz_id));

    $score = 0;
    $total = count($questions);

    foreach ($questions as $question) {
        if (isset($answers['q' . $question->id]) && $answers['q' . $question->id] == $question->correct_answer) {
            $score++;
        }
    }

    wp_send_json(array('score' => $score, 'total' => $total));
}
add_action('wp_ajax_check_quiz_answers', 'check_quiz_answers');
add_action('wp_ajax_nopriv_check_quiz_answers', 'check_quiz_answers');