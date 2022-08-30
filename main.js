
async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {//函数名不要动
	
	 // 此步为必须，用于加载这个工具，后续会增加更多方法
	 await loadTool('AIScheduleTools')
	 // 使用它们的时候务必带上await，否则没有系统alert的时停效果
	 await AIScheduleAlert('请点击我的课表后，点击页面的重新导入')
	var restable =document.getElementsByClassName("WtbodyZlistS")[0].getElementsByTagName('tr');
	var resstr = []
	for (var i = 0; i < 5; i++) {
		var tdArr = restable[i].getElementsByTagName('td');
		for (var j = 1; j < 8; j++) {
			var res = tdArr[j].innerText;
			if (res != "") {
				res = res + "day: " + j;
				resstr.push(res);
			}
		}
	}
	var result;
	for(var i=0;i<resstr.length;i++)
	{
		var item =resstr[i]+"|*|";
		result+=item;
	}
	return result;
}

function scheduleHtmlParser(html) {
	var res=[];
	var strarr=html.split('|*|');
	for(var i=0;i<strarr.length;i++)
	{
		var map={};
		var item=strarr[i];
		if(item=="") break
		var name= item.split('\n')[1]
		var teacher=item.split('\n')[2]
		var position=item.match(/地点.*/i)[0].replace('地点:','') //上课地点
		
		var day=item.match(/day.*/i)[0].replace('day: ','') //星期几
		var sections=[]
		var section= item.match(/:.*节/i)[0].replace('节','').replace(':','')  //节
		var begin=Number(section.split('-')[0]);
		var end=Number(section.split('-')[1])
		
		for(;begin<=end;begin++)
		{
			sections.push(begin)
		}
		var weeks=[]
		begin=Number(item.match(/周次.*/i)[0].replace('周次:','').split('-')[0]) //上课周
		end=Number(item.match(/周次.*/i)[0].replace('周次:','').split('-')[1]) //上课周
		for(;begin<=end;begin++)
		{
			weeks.push(begin)
		}
		map["name"]=name
		map["teacher"]=teacher
		map["position"]=position
		map["day"]=day
		map["sections"]=sections
		map["weeks"]=weeks
		res.push(map)
	}
	return res

}

/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
 async function scheduleTimer({
	providerRes,
	parserRes
  } = {}) {
	return {
	  totalWeek: 20, // 总周数：[1, 30]之间的整数
	  startSemester: '1661126888', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
	  startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
	  showWeekend: true, // 是否显示周末
	  forenoon: 4, // 上午课程节数：[1, 10]之间的整数
	  afternoon: 4, // 下午课程节数：[0, 10]之间的整数
	  night: 4, // 晚间课程节数：[0, 10]之间的整数
	  sections: [{
		section: 1, // 节次：[1, 30]之间的整数
		startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '08:50', // 结束时间：同上
	  },
	  {
		section: 2, // 节次：[1, 30]之间的整数
		startTime: '09:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '09:50', // 结束时间：同上
	  },
	  {
		section: 3, // 节次：[1, 30]之间的整数
		startTime: '10:10', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '11:00', // 结束时间：同上
	  },
	  {
		section: 4, // 节次：[1, 30]之间的整数
		startTime: '11:10', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '12:00', // 结束时间：同上
	  },
	  {
		section: 5, // 节次：[1, 30]之间的整数
		startTime: '14:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '14:50', // 结束时间：同上
	  },
	  {
		section: 6, // 节次：[1, 30]之间的整数
		startTime: '15:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '15:50', // 结束时间：同上
	  },
	  {
		section: 7, // 节次：[1, 30]之间的整数
		startTime: '16:10', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '17:00', // 结束时间：同上
	  },
	  {
		section: 8, // 节次：[1, 30]之间的整数
		startTime: '17:10', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '18:00', // 结束时间：同上
	  },
	  {
		section: 9, // 节次：[1, 30]之间的整数
		startTime: '19:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '19:50', // 结束时间：同上
	  },
	  {
		section: 10, // 节次：[1, 30]之间的整数
		startTime: '20:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '20:50', // 结束时间：同上
	  },
	  {
		section: 11, // 节次：[1, 30]之间的整数
		startTime: '21:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '21:50', // 结束时间：同上
	  },
	  {
		section: 12, // 节次：[1, 30]之间的整数
		startTime: '22:00', // 开始时间：参照这个标准格式5位长度字符串
		endTime: '22:50', // 结束时间：同上
	  },
	], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
	}
	// PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
  }
