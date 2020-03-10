$.formElements = (function () {

  return {
    
  "completeForm": function ($section, $data) {
		Object.keys($data).forEach(function ($v) {
			$section.querySelectorAll("*[name='"+$v+"']").forEach(function ($v2) {
				if ($v2.tagName.toLowerCase() === "input" && $v2.type === "text") {	$v2.value = $data[$v]; }
				else if ($v2.tagName.toLowerCase() === "textarea") { $v2.value = ($data[$v] === null) ? "" : $data[$v]; }
				else if ($v2.tagName.toLowerCase() === "input" && $v2.type === "radio" && $v2.value === $data[$v]) { $v2.checked = true; }
				else if ($v2.tagName.toLowerCase() === "input" && $v2.type === "checkbox" && $data[$v].indexOf($v2.value) > -1) { $v2.checked = true; }
				else if ($v2.hasAttribute("ng-formelement") === true) { $v2.value = $data[$v]; }
			});
		});
	},

	"serialize": function ($section) {
		
		var data = {};
		
		$section.querySelectorAll("*:not([ng-formelement]) input[type='text'][name]").forEach(function ($v) {
			data[$v.name] = ($v.value === "") ? null : $v.value;
		});
		
		$section.querySelectorAll("*:not([ng-formelement]) textarea[name]").forEach(function ($v) {
			data[$v.name] = ($v.value === "") ? null : $v.value;
		});
		
		$section.querySelectorAll("*:not([ng-formelement]) input[type='radio'][name]").forEach(function ($v) {
			if (data[$v.name] === undefined) data[$v.name] = null;
			if ($v.checked === true) data[$v.name] = $v.value;
		});
		
		$section.querySelectorAll("*:not([ng-formelement]) input[type='checkbox'][name]").forEach(function ($v) {
			if (data[$v.name] === undefined) data[$v.name] = [];
			if ($v.checked === true) data[$v.name].push($v.value);
		});
		
		$section.querySelectorAll("*[ng-formelement][name]").forEach(function ($v) {
			data[$v.getAttribute("name")] = $v.value;
		});
		
		return data;
		
	}
	  
  };

}());
