jQuery(document).ready(function($) {
    $('.quiz-form').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        var $container = $form.closest('.quiz-container');
        var quizId = $container.data('quiz-id');
        var answers = {};

        $form.find('input:radio:checked').each(function() {
            answers[$(this).attr('name')] = $(this).val();
        });
        
        $.ajax({
            url: quiz_plugin_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'check_quiz_answers',
                quiz_id: quizId,
                answers: answers
            },
            success: function(response) {
                $container.find('.quiz-score').text(response.score + '/' + response.total);
                $container.find('.quiz-results').show();
                $form.hide();
            }
        });
    });
});