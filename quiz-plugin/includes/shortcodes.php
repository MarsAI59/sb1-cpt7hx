<?php
// Shortcode pour afficher un quiz
function quiz_plugin_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id' => 0,
    ), $atts, 'quiz');

    $quiz_id = intval($atts['id']);

    if ($quiz_id <= 0) {
        return 'ID de quiz invalide.';
    }

    global $wpdb;
    $table_quizzes = $wpdb->prefix . 'quizzes';
    $table_questions = $wpdb->prefix . 'quiz_questions';

    $quiz = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_quizzes WHERE id = %d", $quiz_id));

    if (!$quiz) {
        return 'Quiz non trouvé.';
    }

    $questions = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table_questions WHERE quiz_id = %d", $quiz_id));

    ob_start();
    ?>
    <div class="quiz-container" data-quiz-id="<?php echo esc_attr($quiz_id); ?>">
        <h2><?php echo esc_html($quiz->title); ?></h2>
        <form class="quiz-form">
            <?php foreach ($questions as $index => $question): ?>
                <div class="question">
                    <p><?php echo esc_html($question->question_text); ?></p>
                    <?php
                    $options = json_decode($question->options);
                    foreach ($options as $option_index => $option):
                    ?>
                        <label>
                            <input type="radio" name="q<?php echo esc_attr($question->id); ?>" value="<?php echo esc_attr($option_index); ?>">
                            <?php echo esc_html($option); ?>
                        </label>
                    <?php endforeach; ?>
                </div>
            <?php endforeach; ?>
            <button type="submit" class="quiz-submit">Soumettre</button>
        </form>
        <div class="quiz-results" style="display: none;">
            <h3>Résultats</h3>
            <p>Votre score : <span class="quiz-score"></span></p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('quiz', 'quiz_plugin_shortcode');