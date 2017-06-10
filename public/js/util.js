var historyId = "";
// 全局变量，记录最后一次阅读的栏目的id

var columns = [];
// 栏目数组

var sections = [];
// sections.sort(function(a, b) {
// 	return a.createDate - b.createDate;
// });
// 章节数组 / 排序规则

function load(data) {
	var lastView = data[0].id;
	var lastView_i = 0;
	// 最近打开的栏目的id
	columns = [];
	// 清空数组缓存
	$.each(data, function(index, node) {
		if (node.parent == "root" && node.visible == "1") {
		// 筛选可见的标签
			columns.push(node);
			if(node.viewDate > data[lastView_i].viewDate){
				lastView = node.id;
				lastView_i = index;
			}
			// 找到最近一次打开的栏目
		}
	});
	// 取出栏目(parent = "root")

	columns.sort(function(a, b) {
		return a.createDate - b.createDate;
	});
	// 对栏目以创建时间升序排序

	showCol(columns, lastView);
	// 展示栏目

	sections = [];
	// 清空数组缓存

	$.each(data, function(index, node) {
		if (node.parent == lastView) {
			sections.push(node);
		}
	});
	// 取出最近打开的栏目对应的章节(parent = lastView)

	sections.sort(function(a, b) {
		return a.createDate - b.createDate;
	});
	// 对栏目以创建时间升序排序
	showSec(sections);
	// 展示章节
}

function showCol(columns, lastView) {
// 根据columns数组展示到 #column-menu

	$("#column-menu").find("li.column-label").remove();
	// 对应清空columns数组缓存，同时清空原有标签

	$.each(columns, function(index, node){
		var span = $("<span></span>").text(node.title);
		var a = $("<a href='#'></a>")
			.append(span.addClass("column-title"))
			.append($("<span></span>").addClass("removeLabel glyphicon glyphicon-remove"));
		var li = $("<li></li>").addClass("column-label").attr("id", "column-" + node.id).html(a);
		// var li = $("<li id='column-" + node.id + "' class='column-label'></li>").html(a);
		$("#add_column").before(li);
		// 在添加按钮前面生成一个标签
	});
	$("#column-" + lastView).addClass("active");
}

function showSec(sections) {
// 根据sections数组展示到 #section-menu

	$(".section-label").parent().remove();

	$.each(sections, function(index, node) {
		var spanIcon = $("<span></span>").addClass("glyphicon glyphicon-chevron-right");
		var a = $("<a></a>")
			.attr({
				tabindex: "0",
				role: "button"
			})
			.attr("data-toggle", "popover")
			.addClass("show_toolbar")
			.append(spanIcon);
		var span = $("<span></span>").text(node.title).attr("id", "section-" + node.id);
		var label = $("<label></label>").addClass("section-label").append(span).append(a);
		var ul = $("<ul></ul>").addClass("article-pool");
		var div = $("<div></div>").append(label).append(ul);
		$("#add_section").parent().before(div);
		loadToolbar();
	});
}

function ayncLoad(){
	$.ajax({
		// url: "/data/index.json",
		url: "/data/test.json",
		// url: "/",
		type: "get",
		cache: false,
		dataType: "json",
		success: function(data){
			load(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function addLabelAfterAdd(){
// 添加栏目之后恢复添加便签恢复原样
	$(".active").removeClass("active");
	$("#add_column_icon")
		.css({"display": "block", "lineHeight": "20px"})
		.parent().css({"padding-bottom": "2px", "padding-top": "2px"});
	$("#add_column_inputArea").css({"display": "none"});
}

function loadToolbar() {
	var icon_edit = $("<span></span>").addClass("glyphicon glyphicon-edit");
	var icon_write = $("<span></span>").addClass("glyphicon glyphicon-pencil").attr({title: "添加文章"});;
	var icon_tint = $("<span></span>").addClass("glyphicon glyphicon-tint");
	var icon_bookmark = $("<span></span>").addClass("glyphicon glyphicon-bookmark");
	var icon_random = $("<span></span>").addClass("glyphicon glyphicon-random");
	var icon_list = $("<span></span>").addClass("glyphicon glyphicon-random");
	var filler = $("<span></span>").css({"border-left":"solid 1px #ccc"});
	var icon_remove = $("<span></span>").addClass("glyphicon glyphicon-remove").attr({title: "删除章节"});
	
	var popContent = $("<div></div>").addClass("section-menu-toolbar");
	// popContent.append(icon_edit);
	popContent.append(icon_write);
	// popContent.append(icon_tint);
	// popContent.append(icon_bookmark);
	// popContent.append(icon_random);
	// popContent.append(filler);
	popContent.append(icon_remove);

	var innerHtml = $("<div></div>");
	innerHtml.append(popContent);
	$('.show_toolbar').popover({
		trigger: 'focus',
		html: true,
		content: innerHtml.html()
	});
	// 渲染popover控件
}