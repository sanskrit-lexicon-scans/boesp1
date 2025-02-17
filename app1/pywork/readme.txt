
# rename two directories
mv 'volume 2' volume2  # Space in file names is awkward to work with
mv 'volume 3' volume3  # ditto
# how many pdfs in volume1-3
ls volume?/*.pdf | wc -l
# 1142

# put all pdfs in the pdfpages directory
mkdir pdfpages
mv volume?/*.pdf pdfpages
ls pdfpages | wc -l
# 1142  good. we haven't lost any

# remove the now empty directories
rmdir volume1
rmdir volume2
rmdir volume3

-------------------
# the directory mv 'index for pdf files' is not needed
# move it to a temp directory (which not tracked by github)


-------------------
# filename format
boesp1_001.pdf
boesp1_NNN.pdf  volume 1
boesp2_NNN.pdf  volume 2
boesp3_NNN.pdf  volume 3
--------------------------------------
# setting up app1
mkdir app1
mkdir app1/pywork
# copy 3 index files (tsv format) from
/c/xampp/htdocs/sanskrit-lexicon/PWG/pwgissues/issue87
Indische_Spr_v1_Index.txt
Indische_Spr_v2_Index.txt
Indische_Spr_v3_Index.txt
# concatenate these three files
cat Indisch*.txt > Indische_Spr_Index.txt
# edit Indische_Spr_Index.txt
  remove the 'header' line for volumes 2,3
wc -l Indische_Spr_Index.txt
# 984  ---
 compare to 1142  (number of pdf pages)
 (- 1142 984) 158  why so different?
    Answer:  Correction sections at end of volumes
----------------
# generate index.js
# the 'vp' value is changed to the filename in pdfpages
# e.g. 
python make_js_index.py ALL Indische_Spr_Index.txt index.js
----------------

-------------------------------------------------

