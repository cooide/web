var builder = {
	toHTML: function (obj) {
		var html = this.item[obj.tag](this.attr(obj.attr), obj.option);
		return '<tr><th>' + obj.tip + '</th><td>' + html + '</td></tr>';
	},
	attr: function (attr) {
		var html = '';
		for (let key in attr) {
			html += key + '="' + attr[key] + '"';
		}
		return html;
	},
	item: {
		input: function (attr, option) {
			var html = '';
			if (option === null) {
				html += '<input ' + attr + '>';
			} else {
				for (let key in option) {
					html += '<label><input ' + attr + ' value="' + key + '"' + '>' + option[key] + '</label>';
				}
			}
			return html;
		},
		select: function (attr, option) {
			var html = '';
			for (let key in option) {
				html += '<option value="' + key + '">' + option[key] + '</option>';
			}
			return '<select ' + attr + '>' + html + '</select>';
		},
		textarea: function (attr) {
			return '<textarea ' + attr + '></textarea>';
		}
	}
};

function FormBuilder(elements) {
	this.elements = elements;
}

FormBuilder.prototype.create = function () {
	var html = '';
	for (let key in this.elements) {
		var item = { tag: '', tip: '', attr: {}, option: null };
		for (let keyi in this.elements[key]) {
			item[keyi] = this.elements[key][keyi];
		}
		html += builder.toHTML(item);
	}
	return '<table>' + html + '</table>';
};