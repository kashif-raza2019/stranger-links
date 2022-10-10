// Utility Function to create a random string
const stList = ['Mike', 'Eleven', 'Will', 'Lucas', 'Dustin', 'Nancy', 'Johnathan', 'Hopper', 
'Joyce', 'Steve', 'Henderson', 'Harrington', 'DustiBun', 'Robin', 'Barb', 'Barbara', 'Jim', 
'Demodog', 'Demogorgan', 'MindFlayer', 'Flayer', 'Jane', 'Kali', 'Billy', 'Suzie', 'SuziBu', 
'Brenner', 'Doctor', 'Martin', 'Byers', 'Karen', 'MrWheeler', 'Wheelers', 'Clarke', 'Owens',
'Holly', 'Ted', 'Gregori', 'Russian', 'Alexie', 'Tom', 'Murray', 'Burman', 'Nance', 'Susan', 
'Hargrove', 'Becky', 'Ives', 'HNL', 'HawkinsLab', 'UpSideDown', 'Yuri', 'Heather', 'Holloway',
'Victor', 'Terry', 'Bob', 'BobNewby', 'Dart', 'Vecna']

// Random 4 digits number generator
function randomDigits() {
    let digits = '';
    for (let i = 0; i < 3; i++) {
        digits += Math.floor(Math.random() * 10);
    }
    return digits;
}

// random string generator
function randomString() {
    let string = stList[Math.floor(Math.random() * stList.length)];
    let randNum = randomDigits();
    return string + randNum;
}

module.exports = randomString;