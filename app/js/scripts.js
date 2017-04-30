$(document).ready(function(){
	$(".choose__rooms_item").on("click",function () {
		if($(this).hasClass("checked")){
			$(this).css("background-color", "transparent").css("color", "#FFFFFF").removeClass("checked");
		}
		else{
			$(this).css("background-color", "#FFFFFF").css("color", "#152935").addClass("checked");
		}
	});
	$(".modal_item").on("click",function () {
		if($(this).hasClass("checked")){
			$(this).css("background-color", "transparent").css("color", "#152935").removeClass("checked").css("border","2px solid #DFE3E6");
		}
		else{
			$(this).css("background-color", "#30AE63").css("color", "#FFFFFF").addClass("checked").css("border","2px solid #30AE63");
		}
	});

	$(".select__modal").on("click",function () {
		if($(this).hasClass("unchecked")) {
			$(".modal__content_select-item").css("display", "block").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63")
				.css("box-shadow","0 5px 10px rgba(0,0,0,0.22)");
			$(this).removeClass("unchecked");
			$(".selectVisibleArrow_modal").attr("src","images/selectArrowOutwards.png");
			$(this).css("border-top","2px solid #30AE63").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63").
			css("border-radius",0);
			$(".modal__content_select-item").last().css("border-bottom","2px solid #30AE63");
		}
		else{
			$(".modal__content_select-item").css("display", "none");
			$(this).addClass("unchecked");
			$(".selectVisibleArrow_modal").attr("src","images/selectArrow.png");
			$(this).css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
			css("border-radius","3px");
		}
	});
	$(".modal__content_select-item").hover(function () {
		$(".modal__content_select-item").css("border",0);
		$(".select__modal").css("border","2px solid #dfe3e6");
	});
	$(".modal__content_select-item").on("click",function () {
		var selectedItem = $(this).text().trim();
		$(".select__modal .selectVisibleText_modal").text(selectedItem);
		$(".modal__content_select-item").css("display", "none");
		$(".select__modal").addClass("unchecked");
		$(".selectVisibleArrow_modal").attr("src","images/selectArrow.png");
		$(".select__modal").css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
		css("border-radius","3px");
	});





	$(".footer_button").bind("click",function (e) {
			e.preventDefault();
			$('body,html').animate({scrollTop: 0}, 500);
			$(".windowForModal").css("display","block");
	});
	$(".modal_leaveApplication, .modal_closeButton").on("click",function () {
		$(".windowForModal").css("display","none");
	});
	$(".hamb_on").on("click",function () {
		$(".hamburger__actions").css("display","block");
	});


	$(".select__search").selectPlugin({
		placeholder: "Киев"
	});
	$(".select__content").selectPlugin({
		placeholder: "Политехнический институт",
		colors: ["red","red","green","blue"]
	});



});