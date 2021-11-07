// importing the format_date() function
const {format_date, format_plural, format_url} = require('../utils/helpers');


// writing test to make sure format_date() takes the Date() objects and returns it in the format of MM/DD/YYYY
test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
});

//making sure plural/singular words are inputted properly 
test('format_plural() return a pluralized word', () => {
    const word1 = format_plural('tiger', 2);
    const word2 = format_plural('lion', 1);

    expect(word1).toBe('tigers');
    expect(word2).toBe('lion');
});

//test to fulfill URL format test
test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});