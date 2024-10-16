<?php
// Ajouter le menu d'administration
function quiz_plugin_admin_menu() {
    add_menu_page(
        'Quiz Plugin',
        'Quiz Plugin',
        'manage_options',
        'quiz-plugin',
        'quiz_plugin_admin_page',
        'dashicons-list-view',
        20
    );
}
add_action('admin_menu', 'quiz_plugin_admin_menu');

// Page d'administration principale
function quiz_plugin_admin_page() {
    if (isset($_POST['submit_quiz'])) {
        quiz_plugin_save_quiz();
    }
    ?>
    <div class="wrap">
        <h1>Quiz Plugin Administration</h1>
        <form method="post" action="">
            <input type="text" name="quiz_title" placeholder="Titre du quiz" required>
            <div id="questions-container">
                <div class="question">
                    <input type="text" name="questions[]" placeholder="Question" required>
                    <input type="text" name="options[0][]" placeholder="Option 1" required>
                    <input type="text" name="options[0][]" placeholder="Option 2" required>
                    <input type="text" name="options[0][]" placeholder="Option 3" required>
                    <select name="correct_answers[]">
                        <option value="0">Option 1</option>
                        <option value="1">Option 2</option>
                        <option value="2">Option 3</option>
                    </select>
                </div>
            </div>
            <button type="button" id="add-question">Ajouter une question</button>
            <input type="submit" name="submit_quiz" value="Enregistrer le Quiz" class="button button-primary">
        </form>

        <h2>Quiz existants</h2>
        <?php display_quizzes(); ?>
    </div>
    <script>
        jQuery(document).ready(function($) {
            $('#add-question').click(function() {
                var questionCount = $('.question').length;
                var newQuestion = $('.question').first().clone();
                newQuestion.find('input[type="text"]').val('');
                newQuestion.find('select').attr('name', 'correct_answers[]');
                newQuestion.find('input[name^="options"]').each(function(index) {
                    $(this).attr('name', 'options[' + questionCount + '][]');
                });
                $('#questions-container').append(newQuestion);
            });
        });
    </script>
    <?php
}

// Sauvegarder le quiz
function quiz_plugin_save_quiz() {
    global $wpdb;
    $table_quizzes = $wpdb->prefix . 'quizzes';
    $table_questions = $wpdb->prefix . 'quiz_questions';

    $quiz_title = sanitize_text_field($_POST['quiz_title']);
    
    $wpdb->insert($table_quizzes, array('title' => $quiz_title));
    $quiz_id = $wpdb->insert_id;

    $questions = $_POST['questions'];
    $options = $_POST['options'];
    $correct_answers = $_POST['correct_answers'];

    foreach ($questions as $index => $question_text) {
        $wpdb->insert(
            $table_questions,
            array(
                'quiz_id' => $quiz_id,
                'question_text' => sanitize_text_field($question_text),
                'options' => json_encode(array_map('sanitize_text_field', $options[$index])),
                'correct_answer' => intval($correct_answers[$index])
            )
        );
    }

    echo '<div class="notice notice-success"><p>Quiz enregistré avec succès !</p></div>';
}

// Afficher les quiz existants
function display_quizzes() {
    global $wpdb;
    $table_quizzes = $wpdb->prefix . 'quizzes';
    $quizzes = $wpdb->get_results("SELECT * FROM $table_quizzes ORDER BY created_at DESC");

    if (empty($quizzes)) {
        echo '<p>Aucun quiz n\'a été créé pour le moment.</p>';
        return;
    }

    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead><tr><th>Titre</th><th>Shortcode</th><th>Date de création</th></tr></thead>';
    echo '<tbody>';
    foreach ($quizzes as $quiz) {
        echo '<tr>';
        echo '<td>' . esc_html($quiz->title) . '</td>';
        echo '<td>[quiz id="' . $quiz->id . '"]</td>';
        echo '<td>' . $quiz->created_at . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';
}