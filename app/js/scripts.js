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

	$(".select__header").on("click",function () {
		if($(this).hasClass("unchecked")) {
			$(".choose__city__content_select-item").css("display", "block").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63")
				.css("box-shadow","0 5px 10px rgba(0,0,0,0.22)");
			$(this).removeClass("unchecked");
			$(".selectVisibleArrow_header").attr("src","images/selectArrowOutwards.png");
			$(this).css("border-top","2px solid #30AE63").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63").
			css("border-radius",0);
			$(".choose__city__content_select-item").last().css("border-bottom","2px solid #30AE63");
		}
		else{
			$(".choose__city__content_select-item").css("display", "none");
			$(this).addClass("unchecked");
			$(".selectVisibleArrow_header").attr("src","images/selectArrow.png");
			$(this).css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
			css("border-radius","3px");
		}
	});
	$(".choose__city__content_select-item").hover(function () {
		$(".choose__city__content_select-item").css("border",0);
		$(".select__header").css("border","2px solid #dfe3e6");
	});
	$(".choose__city__content_select-item").on("click",function () {
		var selectedItem = $(this).text().trim();
				$(".select__header .selectVisibleText_header").text(selectedItem);
				$(".choose__city__content_select-item").css("display", "none");
				$(".select__header").addClass("unchecked");
				$(".selectVisibleArrow_header").attr("src","images/selectArrow.png");
				$(".select__header").css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
				css("border-radius","3px");
	});

	$(".select").on("click",function () {
		if($(this).hasClass("unchecked")) {
			$(".realty_search_content_select-item").css("display", "block").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63")
				.css("box-shadow","0 5px 10px rgba(0,0,0,0.22)");
			$(this).removeClass("unchecked");
			$(".selectVisibleArrow").attr("src","images/selectArrowOutwards.png");
			$(this).css("border-top","2px solid #30AE63").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63").
				css("border-radius",0);
			$(".realty_search_content_select-item").last().css("border-bottom","2px solid #30AE63");
		}
		else{
			$(".realty_search_content_select-item").css("display", "none");
			$(this).addClass("unchecked");
			$(".selectVisibleArrow").attr("src","images/selectArrow.png");
			$(this).css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
			css("border-radius","3px");
		}
	});
	$(".realty_search_content_select-item").hover(function () {
		$(".realty_search_content_select-item").css("border",0);
		$(".select").css("border","2px solid #dfe3e6");
	});
	$(".realty_search_content_select-item").on("click",function () {
		var colorOfBranchMetro = {};
		colorOfBranchMetro["Политехнический институт"] = "red";
		colorOfBranchMetro["Шулявская"] = "red";
		colorOfBranchMetro["Золотые ворота"] = "green";
		colorOfBranchMetro["Лыбедская"] = "blue";
		var selectedItem = $(this).text().trim();
		for(var name in colorOfBranchMetro) {
			var value = colorOfBranchMetro[name];
			if(name==selectedItem){
				$(".select .selectVisibleText").text(selectedItem);
				$(".select .colorOfMetro").removeClass("red blue green").addClass(value);
				$(".realty_search_content_select-item").css("display", "none");
				$(".select").addClass("unchecked");
				$(".selectVisibleArrow").attr("src","images/selectArrow.png");
				$(".select").css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
				css("border-radius","3px");
			}
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
});