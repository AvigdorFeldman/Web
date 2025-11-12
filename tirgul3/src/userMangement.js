const html = document.documentElement;
const userName = document.getElementById('userName');
let users = [];
window.onload = function() {
	//משתנה לטעינת פרטי המשתמש שהתחבר
    let user = JSON.parse(localStorage.getItem('currentUser'));
    //עדכון כותרת להצגת שם המשתמש שהתחבר
    userName.textContent = "Welcome " + user.username;
    
    //שליחת בקשה לשליפת נתונים מהקובץ
    fetch('./db.json')
        .then(response =>  response.json()) //שמירת אובייקט התשובה
        .then(jsonData => { //שמירת נתוני הקובץ
    //שליחה לפונקציה לטעינה לטבלה
                users = jsonData.users;
                populateTable('usersData', jsonData)})
        .catch(error=> this.alert("Didn't fetch"))   
};

function populateTable(tableId, jsonData) {
    //משתנה לקישור לתגיות הטבלה
    const table = document.getElementById(tableId);
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');
    //אתחול של תוכן רכיבי הטבלה
    thead.innerHTML = '';
    tbody.innerHTML = '';
    //אם קיימים נתוני משתמשים בקובץ
    if (jsonData.users.length > 0) {
	  //ניקח את כל המפתחות מקובץ לתוך משתנה
        const headers = Object.keys(jsonData.users[0]);
	  //עבור כל מפתח
        headers.forEach(header => {
            if(header != "password"){ //אם הוא לא סיסמא
		    //ניצור למפתח תא כותרת
                const th = document.createElement('th'); 
                th.textContent = header;
                th.classList.add('px-4', 'py-2', 'text-left');
		     //נוסיף לשורת הכותרת של הטבלה
                thead.appendChild(th);
            }
        });
        //עבור כל אובייקט בתוך המערך
        jsonData.users.forEach((item, rowIndex) => {
		//ניצור רשומה בטבלה
            const tr = document.createElement('tr');
		//לכל מפתח שאינו סיסמא
            headers.forEach((header,colIndex) => {
                if(header != "password"){
				
			   //ניצור תא עם תוכן 
                    const td = document.createElement('td');
                    td.textContent = item[header];
                    td.classList.add('border', 'px-4', 'py-2');
                    //נוסיף מאזין לתא כדי שנוכל לבצע עריכה
                    td.dataset.row = rowIndex;        // Store the row index in data-row
                    td.dataset.col = colIndex;        // Store the column index in data-col
                    td.dataset.header = header;       // Store the header name in data-header
                    td.addEventListener("dblclick", ()=>editable.edit(td))
			   //נוסיף את התא לרשומה
                    tr.appendChild(td);
                }
            });
		//נוסיף לגוף הטבלה את הרשומה
            tbody.appendChild(tr);
        });
    } 
    //אם לא קיימים נתוני משתמשים בקובץ
    else {
        //יצירת שורה בטבלה
        const tr = document.createElement('tr');
        //יצירת עמודה בטבלה
        const td = document.createElement('td');
	  //הוספת תוכן לעמודה שאין מידע
        td.textContent = "No data found in JSON.";
	  //הוספת השורה עם התוכן לגוף הטבלה
        tbody.appendChild(tr);
    }
}
let editable = {
    ccell : null, //הפנייה לתא
    cval : null, //תוכן התא
    edit: cell=>{ //אם בוצעה לחיצה כפולה
        editable.ccell = cell; //שמירת התא שעליו נלחץ
        editable.cval = cell.innerHTML; //שמירת תוכן התא שעליו נלחץ
        cell.classList.add("edit"); //הוספת ויזואליזציה של עריכה
        cell.contentEditable = true; //שינוי מצב שהתא בעריכה
        cell.focus();
        cell.onblur = editable.done; //ברגע שנלחץ מחוץ לתא הגדרת סיום
        cell.onkeydown = e =>{ //במידה ונלחץ אנטר או אסקייפ הגדרת סיום
            if(e.key == "Enter"){ editable.done(); }
            if(e.key == "Escape"){ editable.done(1); }
        }
    },
    done: discard =>{ //אם בוצע סיום
	  //שחרור מאזינים
        editable.ccell.onblur = ""; 
        editable.ccell.onkeydown = "";
	  //הורדת ויזואליזציה של עריכה
        editable.ccell.classList.remove("edit");
  //שינוי מצב שהתא לא בעריכה
        editable.ccell.contentEditable = false;
        if(discard===1){ //if escape
            editable.ccell.innerHTML = editable.cval; //החזרת ערך קודם
        }
	  //אם הערך שונה יש לבצע עדכון קובץ
        if(editable.ccell.innerHTML != editable.cval){
            console.log("change");
            //@TODO save changes in file
            try{
                const row = parseInt(editable.ccell.dataset.row, 10);
                const col = parseInt(editable.ccell.dataset.col, 10);
                const header = editable.ccell.dataset.header;
                if (!isNaN(row) && col && header && users && users[row]) {
                    users[row][header]= editable.ccell.innerText;
                    //update json file
                    const usersString = JSON.stringify(users, null, 2);
                    const blob = new Blob([usersString], { type: 'application/json' });
                    //יצירת כתובת רשת זמנית לאובייקט
                    const url = URL.createObjectURL(blob);
                    //יצירת אלמנט קישור להורדת הקובץ
                    const a = document.createElement('a');
                    a.download = 'db.json'; //הגדרת שם הקובץ שיישמר
                    a.href = url; //הצמדת כתובת הרשת של האובייקט לאלמנט
                    a.click(); // סימולציה של לחיצה כדי להתחיל בהורדה
                    URL.revokeObjectURL(url); // ניקוי המשאב מהזיכרון*/
                }else{
                    console.error('Invalid row or field for updating user data.');
                    console.log(row, col,header,users, users[row]);
                }
            } catch (error) {
                console.error('Error updating user data:', error);
                throw new Error(error);
            }
        }
    }
}