// (setq js-indent-level 1)  # for Emacs

function makelink(indexobj,txt) {
 let href = window.location.href;
 //let url = new URL(href);
 //let search = url.search  // a string, possibly empty
 let base = href.replace(/[?].*$/,'');
 let v2 = indexobj.v2;
 let newsearch = `?${v2}`;
 let newhref = base + newsearch;
 let html = `<a class="nppage"href="${newhref}"><span class="nppage1">${txt}</span></a>`;
 return html;
}
function display_ipage_id(indexes) {
 //console.log('display_ipage_id: indexes=',indexes);
 [indexprev,indexcur,indexnext] = indexes;
 let prevlink = makelink(indexprev,'<');
 let nextlink = makelink(indexnext,'>');
 let vp = indexcur['vp'];
 let v = vp.substring(0,1);
 let p = vp.substring(1,4);
 let curpage = `${v}-${p}`;
 //let html = `<p>Page ${curpage}  (${prevlink} ${nextlink})</p>`;
 //let html = `<p>Page ${curpage}  &nbsp; &nbsp; ${prevlink} &nbsp; ${nextlink}</p>`;
 let html = `<p>${prevlink} &nbsp; ${nextlink}</p>`;
 let elt = document.getElementById('ipageid');
 elt.innerHTML = html;
}

function get_pdfpage_from_index(indexobj) {
/* indexobj assumed an element of indexdata
 return name of file with the given volume and page
 boespV_NNN.pdf
*/
 let vp = indexobj['vp'];
 let v = vp.substring(0,1);
 let p = vp.substring(1,4);
 let pdf = `boesp${v}_${p}.pdf`;
 return pdf;
}

function get_ipage_html(indexcur) {
 let html = null;
 if (indexcur == null) {return html;}
 let pdfcur = get_pdfpage_from_index(indexcur);
 //console.log('pdfcur=',pdfcur);
 let urlcur = `../pdfpages/${pdfcur}`;
 let android = ` <a href='${urlcur}' style='position:relative; left:100px;'>Click to load pdf</a>`;
 let imageElt = `<object id='servepdf' type='application/pdf' data='${urlcur}' 
              style='width: 98%; height:98%'> ${android} </object>`;
 //console.log('get_ipage_html. imageElt=',imageElt);
 return imageElt;
}

function display_ipage_html(indexes) {
 display_ipage_id(indexes);
 let html = get_ipage_html(indexes[1]);
 let elt=document.getElementById('ipage');
 elt.innerHTML = html;
}

function get_verse_from_url() {
 /* return int verse number derived from url search string.
  Return as int from 0 (title page) through 
*/
 let href = window.location.href;
 let url = new URL(href);
 // url = http://xyz.com?X ,
 // search = ?X
 let search = url.search  // a string, possibly empty
 let verse = '0'; // default value (title verse)
 let x = search.match(/^[?]([0-9]+)/);
 if (x != null) {
  verse = x[1];
 }
 let iverse = parseInt(verse);
 let maxverse = 5419; // last valid verse number
 if (iverse < 0) {iverse = 0;}
 if (iverse > maxverse) {iverse = maxverse;}
 return iverse;
}

function get_indexobjs_from_verse(verse) {
 // uses indexdata from index.js
 let icur = -1;
 for (let i=0; i < indexdata.length; i++ ) {
  let obj = indexdata[i];
  if ((obj.v1 <= verse) && (verse <= obj.v2)) {
   icur = i;
   break;
  }
 }
 let ans, prevobj, curobj, nextobj
 if (icur == -1) {
  // default
  prevobj = indexdata[0];
  curobj = indexdata[1];
  nextobj = indexdata[2];
  ans  = [indexdata[0],indexdata[1],indexdata[2]];
 } else {
  curobj = indexdata[icur];
  if (icur <= 0) {
   prevobj = curobj;
  } else {
   prevobj = indexdata[icur - 1];
  }
  let inext = icur + 1;
  if (inext < indexdata.length) {
   nextobj = indexdata[inext];
  }else {
   nextobj = curobj;
  }
 }
 ans = [prevobj,curobj,nextobj];
 return ans;
}

function display_ipage_url() {
 let url_verse = get_verse_from_url();
 let indexobjs = get_indexobjs_from_verse(url_verse);
 //console.log('indexobjs=',indexobjs);
 display_ipage_html(indexobjs);
}

document.getElementsByTagName("BODY")[0].onload = display_ipage_url;

