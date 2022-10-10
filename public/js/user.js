document.addEventListener('DOMContentLoaded', function() {
    // if delete query == success then show success message
    if (window.location.href.indexOf('delete=success') > -1) {
        var success = document.getElementById('success-delete');
        success.style.display = 'block';
    }
    if (window.location.href.indexOf('update=success') > -1) {
        var success = document.getElementById('success-update');
        success.style.display = 'block';
    }
});
