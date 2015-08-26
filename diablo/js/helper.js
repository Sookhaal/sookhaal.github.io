var classes = ["barbarian", "crusader", "demonhunter", "monk", "witchdoctor", "wizard"];

function render(tmpl_name, tmpl_data) {
	if (!render.tmpl_cache) {
		render.tmpl_cache = {};
	}
	if (!render.tmpl_cache[tmpl_name]) {
		var tmpl_dir = 'static/templates';
		var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';
		var tmpl_string;
		$.ajax({
			url: tmpl_url,
			method: 'GET',
			async: false,
			success: function (data) {
				tmpl_string = data;
			}
		});
		render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
	}
	return render.tmpl_cache[tmpl_name](tmpl_data);
}

function getContainer() {
	var theTemplateScript = render('0_container', {});

	var theTemplate = Handlebars.compile(theTemplateScript);

	// Pass our data to the template
	var theCompiledHtml = theTemplate();

	return theCompiledHtml;
}

function getImportant() {
	var theTemplateScript = render('1_important', {});

	var theTemplate = Handlebars.compile(theTemplateScript);

	// Pass our data to the template
	var theCompiledHtml = theTemplate();

	return theCompiledHtml;
}

function getClass(className, buildLinkEnding) {
	var theTemplateScript = render('2_hero', {});

	var context = {
		"heroClass": className,
		"build": buildLinkEnding,
	};

	var theTemplate = Handlebars.compile(theTemplateScript);

	// Pass our data to the template
	var theCompiledHtml = theTemplate(context);

	return theCompiledHtml;
}

function getItem(name, image, link) {
	var theTemplateScript = render('3_item', {});

	var context = {
		"itemLink": link,
		"itemName": name,
		"itemImage": image,
	};

	var theTemplate = Handlebars.compile(theTemplateScript);

	// Pass our data to the template
	var theCompiledHtml = theTemplate(context);

	return theCompiledHtml;
}

var classes = ["barbarian", "crusader", "demonhunter", "monk", "witchdoctor", "wizard"];
var builds = ["barbarian#ZhPRdk!ZYbj!cbZcZc", "crusader#ehdXfQ!dWai!bcbZbY", "demon-hunter#UQVYXS!cShi!Ycacac", "monk#WdhPRf!hgfX!aZcacZ", "witch-doctor#agUdPQ!TeWV!cbabbb", "wizard#aPQSOg!dhRb!ZYcZYb"];

function appendClass(classIndex, cubeList, cubeWearList, wearList, buildLinkEnding) {
	for (i = 0; i < cubeList.length; i++) {
		$('#' + classes[classIndex] + '-cube').append(cubeList[i]);
	}

	for (i = 0; i < cubeWearList.length; i++) {
		$('#' + classes[classIndex] + '-cubewear').append(cubeWearList[i]);
	}

	for (i = 0; i < wearList.length; i++) {
		$('#' + classes[classIndex] + '-wear').append(wearList[i]);
	}
}