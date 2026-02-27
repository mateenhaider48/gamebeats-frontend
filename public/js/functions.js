
/* gallery products */
$(document).ready(function(){
	
    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
		$(".filter-button").removeClass('active');
		$(this).addClass('active');
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').fadeIn();
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).fadeOut();
            $('.filter').filter('.'+value).fadeIn();
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});


