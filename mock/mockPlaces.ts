import { Places, WeekPoint, WeekInterval, HourMinute } from '../factory/places';

// helper for creating an Interval from start and end DateObjects
const createWeekInterval = (start: WeekPoint, end: WeekPoint): WeekInterval => {
	return {
		start,
		end,
	};
};

// Take start and end date objects, and create array of intervals for each weekday (M-F)
const createWeekdayInterval = (start: HourMinute, end: HourMinute) => {
	const weekdayIntervals: Array<WeekInterval> = [];
	for (let i = 1; i < 6; i++) {
		const startPoint: WeekPoint = {
			...start,
			weekday: i,
		};
		const endPoint: WeekPoint = {
			...end,
			weekday: i,
		};
		weekdayIntervals.push(createWeekInterval(startPoint, endPoint));
	}
	return weekdayIntervals;
};

// every day deal
const createDailyInterval = (start: HourMinute, end: HourMinute, skipDays:number[] = []) => {
	const weekdayIntervals: Array<WeekInterval> = [];
	for (let i = 1; i < 8; i++) {
		if ( skipDays.includes(i) ) {
			continue;
		}

		const startPoint: WeekPoint = {
			...start,
			weekday: i,
		};
		const endPoint: WeekPoint = {
			...end,
			weekday: i,
		};
		weekdayIntervals.push(createWeekInterval(startPoint, endPoint));
	}
	return weekdayIntervals;
};

// full day deal
// TODO: first check if its open, otherwise this would show before and after open
const createFullDayInterval = (dayOfWeek: number): WeekInterval => {
	return {
		start: {
			weekday: dayOfWeek,
			hour: 0,
			minute: 0,
		},
		end: {
			weekday: dayOfWeek,
			hour: 23,
			minute: 59,
		},
	};
};

// mock places before DB
const mockPlaces: Places = [
	{
		name: 'Fake Restaurant',
		deals: [
			{
				title: '24/7 Pancakes',
				description:
					'Mock deal to show always to test CurrentPlaces.tsx algorithm',
				times: [
					...createDailyInterval(
						{ hour: 0, minute: 0 },
						{ hour: 24, minute: 0 }
					),
				],
			},
			{
				title: 'Morning Waffles',
				description:
					'Mock deal to show always to test CurrentPlaces.tsx algorithm',
				times: [
					...createDailyInterval(
						{ hour: 0, minute: 0 },
						{ hour: 12, minute: 0 }
					),
				],
			},
			{
				title: 'Night Milkshakes',
				description:
					'Mock deal to show always to test CurrentPlaces.tsx algorithm',
				times: [
					...createDailyInterval(
						{ hour: 12, minute: 1 },
						{ hour: 24, minute: 0 }
					),
				],
			},
		],
	},
	{
		name: 'Urban Tap',
		deals: [
			{
				title: '1/2 Off All Drafts',
				description: 'Over 140 drafts, everyday.',
				times: [
					...createWeekdayInterval(
						{ hour: 16, minute: 30 },
						{ hour: 18, minute: 30 }
					),
				],
			},
		],
	},
	{
		name: 'Shady Grove',
		deals: [
			{
				title: 'Weekday Happy Hour',
				description: '$3/$4 Draft Beer, $4 House Wine',
				times: [
					...createWeekdayInterval(
						{ hour: 17, minute: 0 },
						{ hour: 19, minute: 0 }
					),
				],
			},
			{
				title: 'Happy Hour All Day Monday',
				description: '$3/$4 Draft Beer, $4 House Wine',
				times: [createFullDayInterval(1)],
			},
			{
				title: '1/2 Burger Mondays',
				description: 'After 5pm, half off burgers',
				times: [
					{
						start: {
							weekday: 1,
							hour: 17,
							minute: 0
						},
						// TODO: fix this, it goes til 2am when algorithm supports circular day rhythms
						end: {
							weekday: 1,
							hour: 23,
							minute: 59
						}
					}
				]
			},
			{
				title: 'Tuesday Drink Special',
				description:
					'Faber drinks/bombs $4/$5, $3 Spiked Arnold Palmer cans',
				times: [createFullDayInterval(2)],
			},
			{
				title: 'Wednesday Drink Special',
				description: '$4 Long Island, 1/2 off wine bottles',
				times: [createFullDayInterval(3)]
			},
			{
				title: 'Thursday Drink Special',
				description: '$4 Craft Beer Cans, $4 Champagne Glasses',
				times: [createFullDayInterval(4)]
			},
			{
				title: 'Friday Drink Special',
				description: '$5 Titos drinks, $3 Whiteclaw',
				times: [createFullDayInterval(5)]
			},
			{
				title: 'Saturday Drink Special',
				description: '$2.50 Yuengling, $4 Fireball Shots, Ketal One Specials',
				times: [createFullDayInterval(6)]
			},
			{
				title: 'Sunday Drink Special',
				description: '$7 Adult Caprisun, $3 Blue Moon drafts',
				times: [createFullDayInterval(7)]
			},
			{
				title: 'Mimosa Sunday Brunch Deal',
				description: '$4 Mimosas until 4pm',
				times: [
					{
						start: {
							weekday: 7,
							hour: 11,
							minute: 0
						},
						end: {
							weekday: 7,
							hour: 16,
							minute: 0
						}
					}
				]
			}
		],
	},
	{
		name: 'William Penn Tavern',
		deals: [
			{
				title: '$4 Craft Beer Monday',
				description: '20oz drafts',
				times: [
					createFullDayInterval(1)
				]
			},
			{
				title: '$2.50 Miller Lite Tuesday',
				description: '20oz drafts and 12oz bottles',
				times: [
					createFullDayInterval(2)
				]
			},
			{
				title: '$2.50 Yuengling Wednesday',
				description: '20oz drafts',
				times: [
					createFullDayInterval(3)
				]
			},
			{
				title: '$2.50 Miller Lite Thursday',
				description: '20oz drafts and 12oz bottles',
				times: [
					createFullDayInterval(4)
				]
			},
			{
				title: '$2.50 Yuengling Friday',
				description: '20oz drafts',
				times: [
					createFullDayInterval(5)
				]
			},
			{
				title: '$2.50 Coors Light Saturday',
				description: '20oz drafts and 12oz bottles',
				times: [
					createFullDayInterval(6)
				]
			},
			{
				title: '$2.50 Bud Light Sunday',
				description: '20oz drafts and 12oz bottles',
				times: [
					createFullDayInterval(7)
				]
			},
		]
	},
	{
		name: `Cappy's Cafe`,
		deals: [
			{
				title: 'Global Mondays',
				description: '$3 Import Bottles',
				times: [
					createFullDayInterval(1)
				]
			},
			{
				title: 'Taco Night',
				description: '$1.50 Tacos & $3 Burritos, $3 Mexican Beers',
				times: [
					{
						start: {
							weekday: 2,
							hour: 19,
							minute: 0
						},
						end: {
							weekday: 2,
							hour: 23,
							minute: 0
						}
					}
				]
			},
			// TODO: enter wednesday trivia night
			{
				title: 'Guinness & Wine Thursday',
				description: 'Guinness Drafts $4 All Day & Half-Price Wine Bottles ($15.5)',
				times: [
					createFullDayInterval(4)
				]
			},
			{
				title: 'Miller Lite Monsters Friday',
				description: 'Miller Lite Monsters 22 oz Drafts for $3.5',
				times: [
					createFullDayInterval(5)
				]
			},
			{
				title: 'Long Island Saturday',
				description: 'Iced Long Island Teas $4 All Day',
				times: [
					createFullDayInterval(6)
				]
			}
		]
	},
	{
		name: `Mario's Shadyside`,
		url: 'https://mariospgh.com/east-side/',
		deals: [
			{
				title: 'Wednesday Burger Special',
				description: 'All Burgers $5',
				times: [
					{
						start: {
							weekday: 3,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 3,
							hour: 22,
							minute: 0
						}
					}
				]
			},
			{
				title: 'Happy Hour',
				description: '$5 Food Specials',
				times: [
					...createWeekdayInterval(
						{
							hour: 17,
							minute: 0
						},
						{
							hour: 19,
							minute: 0
						}
					)
				]
			}
		]
	},
	{
		name: `Steel Cactus Shadyside`,
		deals: [
			{
				title: 'Happy Hour',
				description: '$5 Apps, $5 Marg Pitchers, Half Off Cocktails & Glasses of Wine',
				times: [
					...createWeekdayInterval(
						{ hour: 16, minute: 30 },
						{ hour: 19, minute: 0 }
					),
				]
			},
			{
				title: 'Monday Food/Drink Special',
				description: '$15 Unlimited Tacos, $3 Jameson, $3 Leinenkugel Drafts',
				times: [
					createFullDayInterval(1)
				]
			},
			{
				title: 'Tuesday Food/Drink Special',
				description: '$2.50 Tacos, $2.75 Dos Equis, $5 House Margs',
				times: [
					createFullDayInterval(2)
				]
			},
			{
				title: 'Wednesday Drink Special',
				description: '$10 Marg Pitchers, $13 Mexican Buckets, $2.75 Mexican Bottles',
				times: [
					createFullDayInterval(3)
				]
			},
			{
				title: 'Thursday Drink Special',
				description: '$5 Well Cocktails & Yuengling Pitchers',
				times: [
					createFullDayInterval(4)
				]
			},
			{
				title: 'Friday Drink Special',
				description: '$10 Marg Pitchers, $3.75 Smirnoff Drinks',
				times: [
					createFullDayInterval(5)
				]
			},
			{
				title: 'Saturday Night Drink Special',
				description: '$3 Smirnoff Drinks, $4 Smirnoff Bombs',
				times: [
					{
						start: {
							weekday: 6,
							hour: 22,
							minute: 0
						},
						end: {
							weekday: 6,
							hour: 23,
							minute: 59
						}
					}
				]
			},
			{
				title: 'Miller Lite Saturday',
				description: '$2.75 Miller Lite',
				times: [
					createFullDayInterval(6)
				]
			},
			{
				title: 'Weekend Brunch',
				description: '$12 Mimosa Carafes or 2 for $20',
				times: [
					{
						start: {
							weekday: 6,
							hour: 10,
							minute: 0
						},
						end: {
							weekday: 6,
							hour: 14,
							minute: 0
						}
					},
					{
						start: {
							weekday: 7,
							hour: 10,
							minute: 0
						},
						end: {
							weekday: 7,
							hour: 14,
							minute: 0
						}
					}
				]
			}
		]
	},
	{
		name: 'Con Alma',
		deals: [
			{
				title: 'Happy Hour',
				description: '$6 Featured Cocktails and Select Wines Glasses',
				times: [
					{
						start: {
							weekday: 1,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 1,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 3,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 3,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 4,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 4,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 5,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 5,
							hour: 19,
							minute: 0
						}
					}
				]
			}
		]
	},
	{
		name: 'Tocayo PGH',
		deals: [
			{
				title: 'Lunch Food Special',
				description: 'Brunch & Lunch Tacos, Quesadillas, Burritos Lunch Prices',
				times: [
					...createWeekdayInterval(
						{
							hour: 11,
							minute: 0
						},
						{
							hour: 14,
							minute: 0
						}
					)
				]
			}
		]
	},
	{
		name: 'Harris Grill',
		deals: [
			{
				title: 'Happy Hour Food/Drink Special',
				description: 'Draft specials, half-priced cosmos, half-off appetizers',
				times: [
					...createWeekdayInterval(
						{
							hour: 16,
							minute: 30
						},
						{
							hour: 18,
							minute: 0
						}
					)
				]
			}
		]
	},
	{
		name: `Kelly's Bar & Lounge`,
		deals: [
			{
				title: 'Happy Hour Food/Drink Special',
				description: '$2 Off Drafts, Half-Off Appetizers',
				times: [
					{
						start: {
							weekday: 2,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 2,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 3,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 3,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 4,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 4,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 5,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 5,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 6,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 6,
							hour: 19,
							minute: 0
						}
					}
				]
			}
		]
	},
	{
		name: 'Casbah',
		deals: [
			{
				title: 'Happy Hour',
				description: '$7 House Cocktails, $7 Select Wines',
				times: [
					...createWeekdayInterval(
						{
							hour: 17,
							minute: 0
						},
						{
							hour: 19,
							minute: 0
						}
					)
				]
			}
		]
	},
	{
		name: `The Yard Shadyside`,
		deals: [
			{
				title: 'Happy Hour Food/Drink Special',
				description: 'Half-off Drafts, Half-off Appetizers, $5 Drink of the Day, $3 House Wine Glasses',
				times: [
					{
						start: {
							weekday: 1,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 1,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 2,
							hour: 17,
							minute: 0
						},
						end: {
							weekday: 2,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 3,
							hour: 16,
							minute: 0
						},
						end: {
							weekday: 3,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 4,
							hour: 16,
							minute: 0
						},
						end: {
							weekday: 4,
							hour: 19,
							minute: 0
						}
					},
					{
						start: {
							weekday: 5,
							hour: 16,
							minute: 0
						},
						end: {
							weekday: 5,
							hour: 19,
							minute: 0
						}
					}
				]
			}
		]
	},
	{
		name: `Hemingway's Cafe`,
		url: 'https://www.hemingwayspgh.com/',
		deals: [
			{
				title: 'Food Special',
				description: 'Most Food Items $5.50',
				times: [
					...createDailyInterval(
						{
							hour: 11,
							minute: 0
						},
						{
							hour: 12,
							minute: 0
						},
						[7]
					),
					...createDailyInterval(
						{
							hour: 14,
							minute: 0
						},
						{
							hour: 16,
							minute: 0
						},
						[7]
					),
					...createDailyInterval(
						{
							hour: 21,
							minute: 0
						},
						{
							hour: 23,
							minute: 59
						},
						[7]
					)
				]
			},
			{
				title: 'Shot Pitcher Special',
				description: '$4 Shot Pitcher of the Day',
				times: [
					...createDailyInterval(
						{
							hour: 22,
							minute: 0
						},
						{
							hour: 23,
							minute: 59
						},
						[7]
					)
				]
			}
		]
	},
	// TODO: Add thirsty scholar, find out their deals
	{
		name: `Mario's Oakland`,
		url: 'https://mariospgh.com/oakland/',
		deals: [
			{
				title: 'Happy Hour',
				description: '$5 Food Specials',
				times: [
					...createWeekdayInterval(
						{
							hour: 17,
							minute: 0
						},
						{
							hour: 19,
							minute: 0
						}
					)
				]
			}
		]
	},
	{
		name: 'Fuel and Fuddle',
		deals: [
			// TODO: find out if this happy hour is weekdays only or all days
			{
				title: 'Happy Hour',
				description: '1/2 Off All Drafts',
				times: [
					...createWeekdayInterval(
						{
							hour: 16,
							minute: 0
						},
						{
							hour: 18,
							minute: 0
						}
					)
				]
			},
			{
				title: 'Late Night Food Special',
				description: 'Discounted food until 1am',
				times: [
					...createDailyInterval(
						{
							hour: 23,
							minute: 0
						},
						// TODO: make this go to 1am once algorithm is fixed
						{
							hour: 23,
							minute: 59
						}
					)
				]
			}
		]
	},
	{
		name: `Mad Mex Oakland`,
		deals: [
			{
				title: 'Happy Hora',
				description: 'Half off all drafts and wings. House Margarita special: $7 Big Azz, $5 16oz, $3 12oz',
				times: [
					...createWeekdayInterval(
						{
							hour: 16,
							minute: 30
						},
						{
							hour: 18,
							minute: 30
						}
					)
				]
			},
			{
				title: 'Late Mex Margs',
				description: '$7 Big Azz Margs',
				times: [
					...createDailyInterval(
						{
							hour: 22,
							minute: 0
						},
						{
							hour: 23,
							minute: 59
						}
					)
				]
			},
			{
				title: 'Late Mex Food',
				description: 'Half Off Food (excluding tacos, chimi, dessert)',
				times: [
					...createDailyInterval(
						{
							hour: 23,
							minute: 0
						},
						// TODO: make this go to 1 am!!!! 
						{
							hour: 23,
							minute: 59
						}
					)
				]
			},
			{
				title: 'Student Halfsies',
				description: 'Half Off Food (excluding tacos, chimi, dessert)',
				times: [
					...createDailyInterval(
						{
							hour: 14,
							minute: 0
						},
						// TODO: make this go to 1 am!!!! 
						{
							hour: 16,
							minute: 0
						},
						[5,6,7]
					)
				]
			},
			{
				title: 'Lunch Specials',
				description: 'Cheap eats, see lunch specials menu',
				url: 'http://madmex.com/static/menus/Mad_Mex_lunch_specials.pdf',
				times: [
					...createWeekdayInterval(
						{
							hour: 11,
							minute: 0
						},
						// TODO: make this go to 1 am!!!! 
						{
							hour: 16,
							minute: 0
						}
					)
				]
			},
		]
	},
	{
		name: `Mad Mex Shadyside`,
		deals: [
			{
				title: 'Happy Hora',
				description: 'Half off all drafts and wings. House Margarita special: $7 Big Azz, $5 16oz, $3 12oz',
				times: [
					...createWeekdayInterval(
						{
							hour: 16,
							minute: 30
						},
						{
							hour: 18,
							minute: 30
						}
					)
				]
			},
			{
				title: 'Late Mex Margs',
				description: '$7 Big Azz Margs',
				times: [
					...createDailyInterval(
						{
							hour: 22,
							minute: 0
						},
						{
							hour: 23,
							minute: 59
						}
					)
				]
			},
			{
				title: 'Student Halfsies',
				description: 'Half Off Food (excluding tacos, chimi, dessert)',
				times: [
					...createDailyInterval(
						{
							hour: 14,
							minute: 0
						},
						// TODO: make this go to 1 am!!!! 
						{
							hour: 16,
							minute: 0
						},
						[5,6,7]
					)
				]
			},
			{
				title: 'Lunch Specials',
				description: 'Cheap eats, see lunch specials menu',
				url: 'http://madmex.com/static/menus/Mad_Mex_lunch_specials.pdf',
				times: [
					...createWeekdayInterval(
						{
							hour: 11,
							minute: 0
						},
						// TODO: make this go to 1 am!!!! 
						{
							hour: 16,
							minute: 0
						}
					)
				]
			},
		]
	}
];

export default mockPlaces;
