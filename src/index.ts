import axios from 'axios';
//@ts-ignore
async function fetchResult(rollNo) {
let data = `_token=HqVe9DV8huklHNGkYV1D7RLE5FwBlmcsR6kdWdVp&session=SE20&COURSETYPE=UG&COURSECD=C000032&RESULTTYPE=R&p1=&ROLLNO=${rollNo}&SEMCODE=SM06&all=`;

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sgbau.ucanapply.com/get-result-details',
  headers: { 
    'accept': 'application/json, text/javascript, */*; q=0.01', 
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 
    'cookie': 'XSRF-TOKEN=eyJpdiI6ImUxKzVXRjIwTlVJd281akpEeXU0SlE9PSIsInZhbHVlIjoiUm84bEpjc0lJeTZRVWlkTGdpM3VUR3RsOWxMelFMT3BUd05xQmM5NjJndHBGU1E1NHcwOWFINTVZR0hhanFGODI2S2RBL1pEL1lxSmNoajZyVmRGN3B4NUJTbEh0SkZ2MTNQVHI0UnhnY1RPRnoxTk52NVhTU3R0aGJGeFFOSEkiLCJtYWMiOiI1NGQ3MTA3NmU3NTVhMzk3MzA5Mjg3MzU4M2QyMDhkODczYmRmNTk4N2M0OTUxNjE4YTg0Mjk2YjMzMjEwZTgwIiwidGFnIjoiIn0%3D; sant_gadge_baba_amravati_university_session=eyJpdiI6IkVGVUdRSVp1Rm9icHFNRWJWMlFjc0E9PSIsInZhbHVlIjoiZVVvYWVBNk4wVVhjRWd1UUpnM0FZYjRlK3R5QSthS0NiZXk1N1RlV1hHYitCaGlBc1RWSXRVSDF6dFFJMTJvWHRZZDBNTmhVZFF6Qk9OUjU4RVJrWG9oMGlYdUZzQzFZZVVkdHhmajB6akIzSUF0M1ZlcjVRcUJYOUhORVl4QmwiLCJtYWMiOiJiY2MzZTUzNzg2YTQyOTEwMzZiYzQ4NTVjYWM4ZTA0YTY5MDI1ZmExYzk5NjQ2NjYxZDNiMTQxMDg0NTQ1ZmU5IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IlBFVE1GQ2RMV2w5cjRzMERxUHkxTFE9PSIsInZhbHVlIjoiRXZiRGtCc3pUM2VVNUJSdUNjSXB3RERHb1UrejVUMHJzZWRvcXhjM0JxdTBLN2V1ell5OTRMVFJIM1p1VDB1ZG5HWWtyWk0vZ1UrRllPdXY0WVM2UXJxa2c5MzhCbFlrdHJ3MHpxVVUzVTUycVV1b0ErWTF6YW1EcXZGcXNRWE4iLCJtYWMiOiJjZWZlZjUxOTJmZjQxYWYxOWY3YWM3Mjk5ODQ3ZWFlMmY1M2MxZTY3YTViZDVmYzA2MDM2YWJlYzU4MTNiMzEzIiwidGFnIjoiIn0%3D; sant_gadge_baba_amravati_university_session=eyJpdiI6Im41K3hrZnRRM2RTckJSMktuQUhqaWc9PSIsInZhbHVlIjoibURkUjJsNWxKUTlRbGkvOTVWNlQ3ejUvVVY5QzJwVnFIU3E2TXFEdjh0S2Q1ajhYZjNSUVNZTWp2Mk9ycGNiM0VTbnJnS0R3UUxDWjBvS0xkU002a0JFSjVwUHIyVVA4UE1jZVYxK2IvSWJGR2lqYkFCTXJGRkI4LzM4QU5ZdUciLCJtYWMiOiJmNDk4OTcyYjBiZjJmOTMzMDNlYzcyYmZmMDhjZmViNWFhZTgyMDE0MzIxMTMyODFlMTg1NWY4MzQ1MzgyMzQ5IiwidGFnIjoiIn0%3D', 
    'origin': 'https://sgbau.ucanapply.com', 
    'priority': 'u=0, i', 
    'referer': 'https://sgbau.ucanapply.com/result-details', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-origin', 
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', 
    'x-csrf-token': 'HqVe9DV8huklHNGkYV1D7RLE5FwBlmcsR6kdWdVp', 
    'x-requested-with': 'XMLHttpRequest'
  },
  data : data
};

try {
  const response = await axios.request(config);
  const htmlString = response.data.html;

 
  //@ts-ignore
  function extractValue(regex) {
    const match = htmlString.match(regex);
    return match ? match[1].trim() : 'Not found';
  }


  const name = extractValue(/Name\s*<\/td>\s*<td>:&nbsp;&nbsp;&nbsp;<\/td>\s*<td[^>]*>(.*?)<\/td>/);
  const rollNo = extractValue(/Roll Number\s*<\/td>\s*<td>:&nbsp;&nbsp;&nbsp;<\/td>\s*<td[^>]*>(.*?)<\/td>/);
  const sgpa = extractValue(/SGPA\s*:<\/td>\s*<td>(.*?)<\/td>/);

  return { name, rollNo, sgpa };
} catch (error) {
  //@ts-ignore
  console.log(`Error fetching result for ${rollNo}:`, error.message);
  return null;
}
}

async function fetchAllResults() {
for (let i = 577; i <= 727; i++) {
  const rollNo = `22BD310${i.toString().padStart(3, '0')}`;
  const result = await fetchResult(rollNo);
  if (result) {
    console.log(`Roll No: ${result.rollNo}`);
    console.log(`Name: ${result.name}`);
    console.log(`SGPA: ${result.sgpa}`);
    console.log('---');
  }
}
}

fetchAllResults();