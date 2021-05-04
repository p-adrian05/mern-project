export const formatDate=(date)=>{
    if(date.toString().match(/(^([0-9]{4})(-[0-9]{2}){2}T(([0-9]{2}:){2})[0-9]{2})/)){
        let dateData = date.split("T");
        let time = dateData[1].substr(0,8);
        return dateData[0]+" "+time;
    }
    return date;
};
