function MealTime(){
    let date = new Date();
    let hr = date.getHours();
    let ret_str = '';
    if (hr >=9 && hr <12)
        ret_str = 'breakfast time';
    else if (hr >=12 && hr <16)
        ret_str = 'lunch time';
    else if (hr >=18 && hr < 21)
        ret_str = 'dinner time';
    else
        ret_str = 'nothing special now';
    return ret_str;
}
exports.mealTime = MealTime;
