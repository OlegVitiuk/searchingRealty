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

	//overflow
	$('.lastItem').on("click",function () {
		$(".overflow").show();
		});
	$('.overflow').on("click",function (e) {
		$(this).hide();
		e.stopPropagation();
	});

	//plugin using
	$(".select__search").selectPlugin({
		placeholder: "Киев"
	});
	$(".select__content").selectPlugin({
		placeholder: "Политехнический институт",
		colors: ["red","red","green","blue"]
	});

	$(".select__modal").selectPlugin({
		placeholder: "Киев"
	});



});