/*		
 	自定义cssTransform函数,实现transform读写功能;
	两个参数:读
		cssTransform(arg1,arg2)
	三个参数:写
		cssTransform(arg1,arg2,arg3)
*/
(function(w){
	w.cssTransform=function(el,attr,val){
		if(!el.transform){
			el.transform={};
		}
		if(arguments.length>2){
			el.transform[attr] = val;
			var text ="";
			for(var item in el.transform){
				switch (item){
					case "rotate":
					case "skewX":
					case "skewY":
						text +=item+"("+el.transform[item]+"deg) ";
						break;
					case "translateX":
					case "translateY":
						text +=item+"("+el.transform[item]+"px) ";
						break;
					case "scaleX":
					case "scaleY":
					case "scale":
						text +=item+"("+el.transform[item]+") ";
						break;
				}
			}
			el.style.transform = el.style.WebkitTransform =text;
		}else{
			val  = el.transform[attr];
			if(typeof val == "undefined"){
				if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
					val = 1;
				} else {
					val = 0;
				}
			}
			return val;
		}
	}
})(window)


