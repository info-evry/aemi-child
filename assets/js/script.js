/*

 This script will be enqueued after aemi parent theme's scripts.
 Keep this in mind and code with smile.

 */

if (window && window.navigator) {
	if (navigator.userAgent) {
		var agent = navigator.userAgent;
		if (agent.indexOf('MSIE') >= 0 || agent.indexOf('Trident') >= 0) {
			var errorString = 'We do not provide any retro compatibility for Internet Explorer.';
			alert(errorString);
			throw new Error(errorString);
		}
	}
}

function select(a) {
	return document.querySelector(a);
}

function selectAll(a) {
	return [...document.querySelectorAll(a)];
}

function getByClass() {
	return document.getElementsByClassName([...arguments].join(' '));
}

const child = new Environment();

child.push(async () => {
	function togglerTextHandler(mutationRecords) {
		for (const { target } of mutationRecords)
		{
			if (hasClass(target, 'toggled'))
			{
				data(target, 'innerHTML', target.innerHTML);
				target.innerHTML = '&larr;&nbsp;Fermer';
			}
			else
			{
				target.innerHTML = data(target,'innerHTML');
			}
		}
	}

	const togglerTextObserver = new MutationObserver(togglerTextHandler);

	for (const e of getByClass('toggle aaa'))
	{
		togglerTextObserver.observe(e, {
			attributes: true,
			attributeFilter: ['class']
		});
	}
	

});


child.push( async () => {
	const mailsprof = [...getByClass('mailprof')].filter(e => e instanceof HTMLAnchorElement);
	for ( const e of mailsprof ) {
		const pread = data(e,'pread') || attr(e,'data-pread');
		const postad = data(e,'postad') || attr(e,'data-postad');
		const string = identifier();
		const blur = `<span class="screen-reader-text">${string}</span>`;
		e.innerHTML = `${blur}<span class="not-screen-reader-text">${pread}</span>${blur}@${blur}<span class="not-screen-reader-text">${postad}</span>`;
		e.addEventListener('click', () => {
			window.location.href = `mailto:${pread}@${postad}`;
		});
	}
});

child.push(async () => {
	const __global__ = getGlobal();
	if (is(__global__))
	{
		__global__.edt = {
			cookieName: 'univgrade',
			toggle: byId('edt-element'),
			form: byId('edt-form'),
			img: byId('edt-img'),
			imgContainer: byId('edt-img-cont'),
			grade: byId('edt-grade'),
			week: byId('edt-week'),
			year: byId('edt-year'),
			comeback: byId('edt-comeback'),
			setCookie: byId('set-default-cookie'),
			today: {},
			current: {},
			grades: [
				{ name: "M2 SA", id: 68419887 },
				{ name: "M2 SR", id: 68419888 },
				{ name: "M2 MIAGE I.", id: 68419883 },
				{ name: "M2 MIAGE A.", id: 6 },
				{ name: "M1 INFO G1", id: 68425740 },
				{ name: "M1 INFO G2", id: 68425741 },
				{ name: "M1 INFO SA", id: 68426833 },
				{ name: "M1 INFO SR", id: 68426834 },
				{ name: "M1 MIAGE I.", id: 68419919 },
				{ name: "M1 MIAGE A.", id: 68419886 },
				{ name: "L3 SA", id: 68419893 },
				{ name: "L3 SR", id: 68419892 },
				{ name: "L3 MIAGE I.", id: 68419891 },
				{ name: "L3 MIAGE A.", id: 7 },
				{ name: "L3 DOUBLE", id: 68426751 },
				{ name: "L2 INFO G1", id: 68426361 },
				{ name: "L2 INFO G2", id: 68426362 },
				{ name: "L2 INFO G3", id: 68426891 },
				{ name: "L2 INFO G4", id: 68426987 },
				{ name: "L1 MI G1", id: 18 },
				{ name: "L1 MI G2", id: 8 },
				{ name: "L1 MI G3", id: 68426495 },
				{ name: "L1 MI G4", id: 68426747 },
				{ name: "L1 MI G5", id: 68426748 },
				{ name: "L1 MI G6", id: 68426749 },
			]
		};
		
		Date.prototype.getWeekNumber = function () {
			const a = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
			const b = a.getUTCDay() || 7;
			a.setUTCDate(a.getUTCDate() + 4 - b);
			const c = new Date(Date.UTC(a.getUTCFullYear(), 0, 1));
			return Math.ceil((((a - c) / 86400000) + 1) / 7);
		};
		
		function updateLink() {
			const { edt } = __global__;
			const { today, current } = edt;
			const grade = current.grade || today.grade;
			const week = current.week || today.week;
			const year = current.year || today.year;
			return `https://edt.univ-evry.fr/vue_etudiant_horizontale.php?current_year=${year}&current_student=${grade}&current_week=${week}&lar=1920&hau=1080`;
		}
		
		function updateImage() {
			const { edt } = __global__;
			const { imgContainer } = edt;
			const img = byId('edt-img');
			if (is(img))
			{
				edt.img = img;
				img.src = updateLink();
			}
			else if (is(imgContainer))
			{
				const img = new Image();
				img.id = 'edt-img';
				img.src = updateLink();
				imgContainer.appendChild(img);
			}
		}
		
		if (('form' in __global__.edt) && is(__global__.edt.form))
		{
			const { edt } = __global__;
			const { toggle } = edt;
			const inner = toggle.innerHTML;
			
			const { has, get } = Cookies;
			const { cookieName, setCookie, today } = edt;
			if (has(cookieName))
			{
				today.grade = get(cookieName);
				setCookie.value = '\u2713';
				addClass(setCookie, 'used');
			}
			else
			{
				today.grade = edt.grades[0].id;
				setCookie.value = 'Conserver ce choix';
			}
			
			const { current, week, year } = edt;
			today.date = new Date();
			today.day = today.date.getDay();
			today.month = today.date.getUTCMonth();
			today.week = today.date.getWeekNumber();
			today.year = today.week === 1 && today.month > 1 ? today.date.getFullYear() + 1 : today.date.getFullYear();
			
			if (today.day === 0 || today.day === 6)
			{
				if (today.week < 52)
				{
					today.week += 1;
				}
				else
				{
					today.week = 1;
					today.year += 1;
				}
			}
			current.grade = today.grade;
			current.day = today.day;
			current.week = today.week;
			current.month = today.month;
			current.year = today.year;
			
			week.value = current.week;
			year.value = current.year;
			
			
			const { grade, grades } = edt;
			for (const { id, name } of grades)
			{
				const level = name.split(/\s/)[0];
				let currentGroup = [...grade.getElementsByTagName('optgroup')];
				
				currentGroup = currentGroup.length > 0 ? currentGroup[currentGroup.length - 1] : undefined;
				
				if (!currentGroup || currentGroup.getAttribute('label') !== level)
				{
					currentGroup = document.createElement('optgroup');
					currentGroup.setAttribute('label', level);
					grade.appendChild(currentGroup);
				}
				currentGroup = [...grade.getElementsByTagName('optgroup')].filter(e => e.getAttribute('label') === level)[0];
				
				if (id.toString() === today.grade.toString())
				{
					currentGroup.innerHTML += `<option value="${id}" selected>${name}</option>`;
				} else
				{
					currentGroup.innerHTML += `<option value="${id}">${name}</option>`;
				}
			}
			
			
			const { comeback } = edt;
			comeback.addEventListener('click', function () {
				const { edt } = __global__;
				const { comeback, current, form, today, week, year } = edt;
				if (current.week === today.week && current.year === today.year)
				{
					addClass(comeback, 'active');
				}
				else
				{
					week.value = today.week;
					year.value = today.year;
				}
				form.dispatchEvent(new Event('input'));
			});
			
			const { imgContainer } = edt;
			function toggleModalActive() {
				const { edt } = __global__;
				const { imgContainer } = edt;
				toggleClass(imgContainer, 'modal-active');
			}
			imgContainer.addEventListener('click', toggleModalActive);
			byId('modal-close').addEventListener('click', toggleModalActive);
			
			function backward() {
				const { edt } = __global__;
				const { form, week, year } = edt;
				if (Number(week.value) === 1)
				{
					year.value = Number(year.value) - 1;
					week.value = 52;
				}
				else
				if (Number(week.value) > 1)
				{
					week.value = Number(week.value) - 1;
				}
				form.dispatchEvent(new Event('input'));
			}
			
			function forward() {
				const { edt } = __global__;
				const { form, week, year } = edt;
				if (Number(week.value) === 52)
				{
					year.value = Number(year.value) + 1;
					week.value = 1;
				}
				else
				if (Number(week.value) < 52)
				{
					week.value = Number(week.value) + 1;
				}
				form.dispatchEvent(new Event('input'));
			}
			
			setCookie.addEventListener('click', function () {
				const { edt } = __global__;
				const { set } = Cookies;
				const { cookieName, current, grade } = edt;
				set(cookieName, current.grade);
				grade.dispatchEvent(new Event('change'));
			});
			
			grade.addEventListener('change', function () {
				const { edt } = __global__;
				const { has, get } = Cookies;
				const { cookieName, grade, setCookie } = edt;
				if (has(cookieName))
				{
					if (grade.options[grade.selectedIndex].value !== get(cookieName))
					{
						if (hasClass(setCookie, 'used'))
						{
							removeClass(setCookie, 'used');
							setCookie.value = 'Conserver ce choix';
						}
					} else
					{
						if (!hasClass(setCookie, 'used'))
						{
							addClass(setCookie, 'used');
							setCookie.value = '\u2713';
						}
					}
				}
			});
			
			[...getByClass('edt-backward')].forEach(e => e.addEventListener('click', backward));
			[...getByClass('edt-forward')].forEach(e => e.addEventListener('click', forward));
			
			document.body.addEventListener('keydown', ({ key }) => {
				const { edt } = __global__;
				const { imgContainer } = edt;
				if (hasClass(imgContainer, 'modal-active'))
				{
					({ 'ArrowLeft': backward, 'ArrowRight': forward })[key]();
				}
			});
			
			const { form } = edt;
			form.addEventListener('input', () => {
				const { edt } = __global__;
				const { current, grade, week, year } = edt;
				current.grade = grade.options[grade.selectedIndex].value;
				current.week = week.value;
				current.year = year.value;
				updateImage();
			});
			updateImage();
		}
	}
});

child.run();