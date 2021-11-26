function readURL(input, imgControlName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(imgControlName).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imag").change(function() {
    // add your logic to decide which image control you'll use
    var imgControlName = "#ImgPreview";
    readURL(this, imgControlName);
    $('.preview1').addClass('it');
    $('.btn-rmv1').addClass('rmv');
});
$("#imag2").change(function() {
    // add your logic to decide which image control you'll use
    var imgControlName = "#ImgPreview2";
    readURL(this, imgControlName);
    $('.preview2').addClass('it');
    $('.btn-rmv2').addClass('rmv');
});
$("#imag3").change(function() {
    // add your logic to decide which image control you'll use
    var imgControlName = "#ImgPreview3";
    readURL(this, imgControlName);
    $('.preview3').addClass('it');
    $('.btn-rmv3').addClass('rmv');
});
$("#imag4").change(function() {
    // add your logic to decide which image control you'll use
    var imgControlName = "#ImgPreview4";
    readURL(this, imgControlName);
    $('.preview4').addClass('it');
    $('.btn-rmv4').addClass('rmv');
});
$("#imag5").change(function() {
    // add your logic to decide which image control you'll use
    var imgControlName = "#ImgPreview5";
    readURL(this, imgControlName);
    $('.preview5').addClass('it');
    $('.btn-rmv5').addClass('rmv');
});

$("#removeImage1").click(function(e) {
    e.preventDefault();
    $("#imag").val("");
    $("#ImgPreview").attr("src", "");
    $('.preview1').removeClass('it');
    $('.btn-rmv1').removeClass('rmv');
});
$("#removeImage2").click(function(e) {
    e.preventDefault();
    $("#imag2").val("");
    $("#ImgPreview2").attr("src", "");
    $('.preview2').removeClass('it');
    $('.btn-rmv2').removeClass('rmv');
});
$("#removeImage3").click(function(e) {
    e.preventDefault();
    $("#imag3").val("");
    $("#ImgPreview3").attr("src", "");
    $('.preview3').removeClass('it');
    $('.btn-rmv3').removeClass('rmv');
});
$("#removeImage4").click(function(e) {
    e.preventDefault();
    $("#imag4").val("");
    $("#ImgPreview4").attr("src", "");
    $('.preview4').removeClass('it');
    $('.btn-rmv4').removeClass('rmv');
});
$("#removeImage5").click(function(e) {
    e.preventDefault();
    $("#imag5").val("");
    $("#ImgPreview5").attr("src", "");
    $('.preview5').removeClass('it');
    $('.btn-rmv5').removeClass('rmv');
});

$('.custom-image-upload .yes img').each(function() {
    if ($(this).attr('src') !== "") {
        // $(this).attr('src', 'Images/download.jpg');
        $(this).addClass('it');
        $(this).parent().addClass('no_bg');
        $(this).parent().siblings('.custom-image-upload input[type="button"]').addClass('rmv');
    }
});

$('.custom-image-upload input[type="button"]').click(function() {
    $(this).siblings('.custom-image-upload .yes').removeClass('no_bg');
});