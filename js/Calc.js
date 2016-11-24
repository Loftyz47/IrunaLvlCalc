/*jslint browser:true*/
/*
    * Caculator Code
    * 1Conan
*/
document.addEventListener("DOMContentLoaded", function () {
	'use strict';
	var lvl,
		mq,
		sq,
		canv_hp = document.getElementById('canvas_hp'),
		canv_hp_context = canv_hp.getContext('2d'),
		xp_img = document.getElementById('xp_img'),
		spoiler_btn = document.getElementsByClassName('spoilerbtn'),
		spoiler_div = document.getElementsByClassName('spoiler'),
		time = new Date(),
		z;
	canv_hp_context.fillStyle = 'rgb(233, 231, 234)';
	canv_hp_context.font = '14pt Arial';
	canv_hp_context.fillText('1', 144, 31);
	canv_hp_context.fillText('1Conan', 190, 31);
	canv_hp_context.fillText(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2), 795, 31);
	
	function getJSON(url) {
		var request = new XMLHttpRequest(),
			data;
		request.open('GET', url, false);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
			} else {
				return false;
			}
		};
		request.send();
		return JSON.parse(data);
	}
	function addSpoiler(index) {
		spoiler_btn[index].addEventListener('click', function (a) {
			a.preventDefault();
			if (spoiler_div[index].style.display === 'none') {
				spoiler_div[index].style.display = 'block';
			} else {
				spoiler_div[index].style.display = 'none';
			}
		});
	}
	mq = getJSON('json/mq.json');
	sq = getJSON('json/sq.json');
	lvl = getJSON('json/lvl.json');

	document.onkeyup = function () {
		var inp_glvl = document.getElementById('inp_glvl'),
			out_rxp = document.getElementById('out_rxp'),
			out_xpach = document.getElementById('out_xpach'),
			out_xpup = document.getElementById('out_xpup'),
			out_xpgoal = document.getElementById('out_xpgoal'),
			out_mxp = document.getElementById('out_mxp'),
			out_mglvl = document.getElementById('out_mglvl'),
			inp_mxp = document.getElementById('inp_mxp'),
			inp_lvl = document.getElementById('inp_lvl'),
			inp_exp = document.getElementById('inp_exp'),
			inp_usr = document.getElementById('inp_usr'),
			inp_akt = document.getElementById('inp_akt'),
			out_akt = document.getElementById('out_akt'),
			out_gakt = document.getElementById('out_gakt'),
			inp_cmq = document.getElementById('inp_cmq'),
			inp_csq = document.getElementById('inp_csq'),
			out_cmq = document.getElementById('out_cmq'),
			out_csq = document.getElementById('out_csq'),
			out_txp = document.getElementById('out_txp'),
			out_mlwg = document.getElementById('out_mlwg'),
			tmp_1,
			tmp_2,
			xp_x = 162,
			i,
			ind,
			tmp_lp,
			tmp_xpt,
			tmp_xpach,
			tmp_rxp,
			tmp_txp,
			tmp_lvl;

		if (inp_exp.value > 100) {
			inp_exp.value = 100;
		}
		
		if (inp_lvl.value > 360) {
			inp_lvl.value = 360;
		}
		
		canv_hp_context.clearRect(0, 0, canv_hp.width, canv_hp.height);
		canv_hp_context.fillText(inp_lvl.value, 144, 31);
		canv_hp_context.fillText(inp_usr.value, 190, 31);
		canv_hp_context.fillText(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2), 795, 31);
		tmp_1 = xp_x;
		for (i = 0; i < inp_exp.value; i = i + 1) {
			canv_hp_context.drawImage(xp_img, tmp_1, 43);
			tmp_1 = xp_x + ((i + 1) * 7);
		}
		/*
			Old function for image.
			Consumes a lot of data. Impractical.
			Replaced with HTML5 canvas. 
		*/
		//document.getElementById('img_iruna').src = 'http://127.0.0.1/IrunaLvlCalc/img.php?usr=' + inp_usr.value + '&lvl=' + inp_lvl.value + '&xp=' + inp_exp.value;
		if (inp_lvl.value.length > 0) {
			out_rxp.value = lvl[(inp_lvl.value) - 1].xp_need;
		}
		
		if (inp_exp.value.length > 0) {
			out_xpach.value = Math.round(out_rxp.value * (inp_exp.value / 100));
		}
		
		out_xpup.value = Math.round(out_rxp.value - out_xpach.value);
		
		if (inp_glvl.value.length > 0) {
			out_xpgoal.value = Math.round((lvl[inp_glvl.value - 1].xp_total - lvl[inp_lvl.value - 1].xp_total) - out_xpach.value);
		}
		
		if (inp_mxp.value.length > 0) {
			out_mxp.value = Math.round(out_xpup.value / inp_mxp.value);
			out_mglvl.value = Math.round(out_xpgoal.value / inp_mxp.value);
		}
		
		if (inp_akt.value.length > 0) {
			out_akt.value = Math.round(((out_mxp.value * inp_akt.value) / 60) / 60) + '[h] ' +  Math.round(((((out_mxp.value * inp_akt.value) / 60) / 60) - Math.trunc(((out_mxp.value * inp_akt.value) / 60 / 60))) * 60) + '[m]';
			out_gakt.value = Math.round(((out_mglvl.value * inp_akt.value) / 60) / 60) + '[h] ' +  Math.round(((((out_mglvl.value * inp_akt.value) / 60) / 60) - Math.trunc(((out_mglvl.value * inp_akt.value) / 60 / 60))) * 60) + '[m]';
		}
		
		if (inp_cmq.value.length > 0) {
			out_cmq.value = mq[inp_cmq.value - 1].xp_total;
		}
		
		if (inp_csq.value.length > 0) {
			out_csq.value = sq[inp_csq.value - 1].xp_total;
		}
		
		if (inp_csq.value.length > 0 && inp_cmq.value.length > 0) {
			out_txp.value = Number(out_csq.value) + Number(out_cmq.value);
		}
		
		if (inp_lvl.value.length > 0 && out_rxp.value > 0 && out_xpach.value > 0 && out_txp.value > 0) {
			ind = Number(lvl.length);
			tmp_xpach = Number(out_xpach.value);
			tmp_rxp = Number(out_rxp.value);
			tmp_txp = Number(out_txp.value);
			tmp_lvl = Number(inp_lvl.value);
			while (tmp_lvl < ind) {
				tmp_lp = tmp_txp - (tmp_rxp - tmp_xpach);
				tmp_xpt = lvl[ind - 1].xp_total - lvl[tmp_lvl - 1].xp_total;
				if (tmp_xpt < tmp_lp) {
					out_mlwg.value = lvl[ind - 1].lvl;
					break;
				}
				ind = ind - 1;
			}
		}
	};
	
	z = spoiler_btn.length;
	while (z > 0) {
		addSpoiler(z);
		z = z - 1;
	}
}, false);
