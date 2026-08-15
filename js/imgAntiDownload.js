window.addEventListener('DOMContentLoaded',function(){
    $(document).on('contextmenu', '.img.anti-download', function(){
        return false;
    });
});