$(document).ready(function () {
    // Find all elements that contain the specified words
    $("p:contains('Developer Akademie GmbH'), p:contains('Developer Akademie'), p:contains('Join')").each(function () {
        // Replace the exact words with the desired styles
        $(this).html(
            $(this).html()
                .replace(/\bDeveloper Akademie GmbH\b/g, '<span style="color: #4589FF; font-size: 16px;">Developer Akademie GmbH</span>')
                .replace(/\bDeveloper Akademie\b/g, '<span style="color: #4589FF; font-size: 16px;">Developer Akademie</span>')
                .replace(/\bJoin\b/g, '<span style="color: #4589FF; font-size: 16px;">Join</span>')
        );
    });
});