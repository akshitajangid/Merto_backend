var Errormsg='';
jQuery(function($) {
    $(window).on("load", function() {
        $("div.loadScreen").fadeOut();
    });

    // Submenu
    $.fn.submenu = function() {
        var $self = $(this);
        $self.each(function(index, elem) {
            var hasChild = $(elem).children('ul');
            var childrenLength = $(elem).children('ul').length;
            if (childrenLength) {
                $(this).prepend('<i class="nav-drp-arw"></i>');

                //[ .nav-drp-arw css:-
                //.nav-drp-arw {  position: absolute; right: 0; top: 14px; cursor: pointer; }
                // .nav-drp-arw:after { font-size: 20px; font-weight: bold; color: #fff; content: '+'; }
                // .nav-drp-arw.current:after { background: #fff; width: 15px; height: 3px; content: ''; position: absolute; right: 0; top: 8px; } ]

            }

            $(elem).on('click', '.nav-drp-arw', function(e) {
                $(this).toggleClass('current');
                $(this).parent('li').find('> ul').stop(true, true).slideToggle('fast');
                $(this).parent('li').siblings().find('ul').stop(true, true).slideUp('fast');
                $(this).parent('li').siblings().find('.nav-drp-arw').removeClass('current');
                event.stopPropagation();
            });
        });
    }
    $('.sidebar-nav ul li').submenu();
    $('.sidebar-nav ul ul li.current').parents('ul').show();
    $('.sidebar-nav li.current').children('.nav-drp-arw').addClass('current');

    $(window).resize(function() {
        $('.sidebar-nav').height($(window).height() - 80);
    });
    $(window).trigger('resize');


    if ($(window).width() <= 767) {
        $(window).resize(function() {
            $('.searchbar.hide').next().height($(window).height() - 133);
        });
        $(window).trigger('resize');
    }

    $(window).resize(function() {
        $('.notify-list ul').height($(window).height() - 228);
    });
    $(window).trigger('resize');

    $('a.notify-btn').click(function(e) {
        e.preventDefault();
        $('.notify-list').fadeToggle('fast');
        $('.user-popup').fadeOut('fast');
    });

    $('a.userAdmin-btn').click(function(e) {
        e.preventDefault();
        $('.user-popup').fadeToggle('fast');
        $('.notify-list').fadeOut('fast');
    });

    // Show/hide password
    $(".toggle-password").click(function() {
        $(this).toggleClass("show");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $('a.mob-menu-btn').click(function(e) {
        e.preventDefault();
        $('.dashboard-sidebar').addClass('change');
        $('.nav-overlay').fadeIn('fast');
    });

    $('.nav-overlay').click(function(e) {
        e.preventDefault();
        $('.nav-overlay').fadeOut('fast');
        $('.dashboard-sidebar').removeClass('change');
    });

    // Nested Click
    $('.form-list-panel li h3').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('current');
        if ($(this).next().is(':hidden')) {
            $('a.settings-btn').next().slideUp('fast');
            $(this).next().slideDown('fast');
        } else {
            $(this).next().slideUp('fast');
        }
        return false;
    });

    $(".sidebar-nav,.notify-list ul").mCustomScrollbar({
        theme: "dark",
        axis: "y",
        mouseWheelPixels: 80,
        scrollInertia: 500,
        scrollAmount: "auto",
        scrollType: "string"
    });


    // Document click div hide 
    $(document).mouseup(function(e) {
        if ($(e.target).closest(".notification-box, .user-admin").length === 0) {
            $(".notify-list").fadeOut('fast');
            $(".user-popup").fadeOut('fast');
        }
    });

    $('.tabs_nav1').dragscroll({
        direction: 'scrollLeft'
    });

    $(".child_class").on("mousewheel", function(e) {
        var outer = $(this).closest(".parent_class")
            //outer.scrollLeft(outer.scrollLeft() + e.originalEvent.deltaY)
        outer.stop(false, false).animate({ scrollLeft: "+=" + e.originalEvent.deltaY }, 50)
        e.preventDefault();
    });

    // Custom tabs
    info1 = $('#tabs_container1 > div');
    $('#tabs_nav1 a:first').addClass('current');
    $('#tabs_container1 > div:first').show();
    $('#tabs_nav1 a').click(function(e) {
        e.preventDefault();
        var index = $(this).index();
        info1.hide();
        info1.eq(index).fadeIn();
        $('#tabs_nav1 a').removeClass('current');
        $(this).addClass('current');
        setTimeout(function() {
            $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust().fixedColumns().relayout();
        }, 0);
        setInterval(function() {
            $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust().fixedColumns().relayout();
        }, 0);
    });

    info2 = $('#tabs_container2 > div');
    $('#tabs_nav2 a:first').addClass('current');
    $('#tabs_container2 > div:first').show();
    $('#tabs_nav2 a').click(function(e) {
        e.preventDefault();
        var index = $(this).index();
        info2.hide();
        info2.eq(index).fadeIn();
        $('#tabs_nav2 a').removeClass('current');
        $(this).addClass('current');
        setTimeout(function() {
            $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust().fixedColumns().relayout();
        }, 0);
        setInterval(function() {
            $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust().fixedColumns().relayout();
        }, 0);
    });

    $("#checkAll").click(function() {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });

    // Equal height js
    var highestBox = 0;
    $('.c_p_1>ul>li').each(function() {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('.c_p_1>ul>li').height(highestBox);

    var highestBox2 = 0;
    $('.c_p_2>ul>li').each(function() {
        if ($(this).height() > highestBox2) {
            highestBox2 = $(this).height();
        }
    });
    $('.c_p_2>ul>li').height(highestBox2);

    var highestBox3 = 0;
    $('.c_p_3>ul>li').each(function() {
        if ($(this).height() > highestBox3) {
            highestBox3 = $(this).height();
        }
    });
    $('.c_p_3>ul>li').height(highestBox3);

    $('.action-box a.delete-btn').click(function(e) {
        e.preventDefault();
        $(this).parents('div.dataTables_wrapper tbody tr').remove();
    });

    $('textarea').each(function() {
        $(this).val($(this).val().trim());
    });

    // Input color picker
    document.querySelectorAll('input[type=color]').forEach(function(picker) {

        var targetLabel = document.querySelector('label[for="' + picker.id + '"]'),
            codeArea = document.createElement('span');

        codeArea.innerHTML = picker.value;
        targetLabel.appendChild(codeArea);

        picker.addEventListener('change', function() {
            codeArea.innerHTML = picker.value;
            targetLabel.appendChild(codeArea);
        });
    });

    // Equal height js
    var highestBox = 0;
    $('.test-service-list li').each(function() {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('.test-service-list li').height(highestBox);

    // Masonry js

    var colWidth = $(".grid-item").width();
    window.onresize = function() {
        var colWidth = $(".grid-item").width();
    }
    console.log(colWidth);

    var $grid = $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        // percentPosition: true,
        gutter: 25,
        fitWidth: true
    });

    $grid.imagesLoaded().progress(function() {
        $grid.masonry("layout");
    });

    // =========================================================================



    // Datatable js
    $('.dTable').DataTable({
        "order": [
            [1, 'desc']
        ],
        /*asc*/
        // "scrollY": 600,
        "scrollX": true,
        "bScrollCollapse": true,
        info: true,
        "bSort": true,
        autoWidth: false,
        "bSortable": true,
        "searching": true,
        responsive: true,
        // "pagingType": "full_numbers",
        "ordering": false,
        "lengthMenu": [
            [10, 20, 30, 40, 50, -1],
            [10, 20, 30, 40, 50, "All"]
        ],

        language: {
            searchPlaceholder: "Type & Enter",
            search: "",
            sLengthMenu: "Show _MENU_", //Show : 
        },
        initComplete: function(settings) {
            //settings.nTable.id --> Get table ID
            $('#' + settings.nTable.id + '_filter input').wrap(`
                <div class="d-inline-flex position-relative"></div>
            `).after(`
                <button type="button" class="close" aria-label="Close" style="right:5px">
                  <span aria-hidden="true">&times;</span>
                </button>
            `).attr('required', 'required').attr('title', 'Type & Enter');

            // Click Event on Clear button
            $(document).on('click', '#' + settings.nTable.id + '_filter button', function() {
                $('#' + settings.nTable.id).DataTable({
                    "retrieve": true,
                }).search('').draw(); // reDraw table
            });
        },
        "oLanguage": {
            "sInfo": "Show _START_ out of _TOTAL_ items"
        },
    });
    setTimeout(function() {
        $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust().fixedColumns().relayout();
    }, 0);
    setInterval(function() {
        $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust().fixedColumns().relayout();
    }, 0);


    // Datatable js
    var table = $(".table_1").DataTable({
        "order": [
            [1, 'desc']
        ],
        /*asc*/
        // "scrollY": 600,
        "scrollX": true,
        "bScrollCollapse": true,
        info: true,
        "bSort": true,
        autoWidth: false,
        "bSortable": true,
        "searching": true,
        responsive: true,
        // "pagingType": "full_numbers",
        "ordering": false,
        "lengthMenu": [
            [10, 20, 30, 40, 50, -1],
            [10, 20, 30, 40, 50, "All"]
        ],

        language: {
            searchPlaceholder: "Type & Enter",
            search: "",
            sLengthMenu: "Show _MENU_", //Show : 
        },
        initComplete: function(settings) {
            //settings.nTable.id --> Get table ID
            $('#' + settings.nTable.id + '_filter input').wrap(`
                <div class="d-inline-flex position-relative"></div>
            `).after(`
                <button type="button" class="close" aria-label="Close" style="right:5px">
                  <span aria-hidden="true">&times;</span>
                </button>
            `).attr('required', 'required').attr('title', 'Type & Enter');

            // Click Event on Clear button
            $(document).on('click', '#' + settings.nTable.id + '_filter button', function() {
                $('#' + settings.nTable.id).DataTable({
                    "retrieve": true,
                }).search('').draw(); // reDraw table
            });
        },
        "oLanguage": {
            "sInfo": "Show _START_ out of _TOTAL_ items"
        },
    });

    // Date range vars
    minDateFilter = "";
    maxDateFilter = "";

    $("#daterange").daterangepicker();
    $("#daterange").on("apply.daterangepicker", function(ev, picker) {
        minDateFilter = Date.parse(picker.startDate);
        maxDateFilter = Date.parse(picker.endDate);

        $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
            var date = Date.parse(data[1]);

            if (
                (isNaN(minDateFilter) && isNaN(maxDateFilter)) ||
                (isNaN(minDateFilter) && date <= maxDateFilter) ||
                (minDateFilter <= date && isNaN(maxDateFilter)) ||
                (minDateFilter <= date && date <= maxDateFilter)
            ) {
                return true;
            }
            return false;
        });
        table.draw();
    });





}); //End jQuery

//======================Form Validate===============================================
$(document).on('change keyup', '.required', function(e) {
    let Disabled = true;
    $(".required").each(function() {
        let value = this.value
        if ((value) && (value.trim() != '')) {
            Disabled = false
        } else {
            Disabled = true
            return false
        }
    });

    if (Disabled) {
        $('input[type="submit"]').prop("disabled", true);
    } else {
        $('input[type="submit"]').prop("disabled", false);
    }
});

// Upload Images
function HandleBrowseClick(input_image) {
    var fileinput = document.getElementById(input_image);
    fileinput.click();
};

$('.upload-img-area .btn-area a.delete_btn').click(function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).siblings('.changeBtn').attr("disabled", false);
    $(this).parents('.btn-area').siblings('.upload-img').children('.upload-img img').attr('src', '');
});
$('.changeBtn').click(function() {
    $(this).attr("disabled", true);
    if ($(this).parents('.btn-area').siblings('.upload-img').children('img').attr('src') == "") {
        $(this).next().delay(2000).show();
    }

});
setTimeout(function(){ 
    $(".alert-danger").hide();
     Errormsg='';
}, 
10000);
