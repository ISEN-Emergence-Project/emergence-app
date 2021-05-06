
#This algorithms create final pairs godfather-laureate according to the marks each godfathers and laureates gives at the end of their meetings
#
#The aim of this algorithms is to maximize the satisfaction rate of the pairS (average of all the marks godfathers and laureates give to their associated pair)




# input file example (stringify json):
# "[{\"Parrain\":\"Parrain 1\",\"Laureat\":\"Laureat 2\",\"NoteParrain\":4,\"NoteLaureat\":2}, {\"Parrain\":\"Parrain 1\",\"Laureat\":\"Laureat 1\",\"NoteParrain\":2,\"NoteLaureat\":2},{\"Parrain\":\"Parrain 2\",\"Laureat\":\"Laureat 1\",\"NoteParrain\":4,\"NoteLaureat\":1},{\"Parrain\":\"Parrain 2\",\"Laureat\":\"Laureat 2\",\"NoteParrain\":2,\"NoteLaureat\":3}]" 

# Output with those data :
# {"Parrain 1": "Laureat 2", "Parrain 2": "Laureat 1"}



# Output : json file {"Parrain" : "Laureat", "Parrain" : "Laureat", "Parrain" : "Laureat", ...}



# Errors : - error : couldn't find a result with those data
#			
# 			!! Maybe the number of godfather and laureates are not the same ? !!




# Average satisfaction rate : 3.07/4 test with random marks for 40 laureates and 40 godfathers




from ortools.sat.python import cp_model
import random
import json
import sys

dictresult={}

if len(sys.argv) != 2:
    exit('Preselections list is required as argument')


#dictnote={}

#dictmeeting={"Parrain 1": ["Laureat 12", "Laureat 15", "Laureat 10", "Laureat 9"], "Parrain 2": ["Laureat 38", "Laureat 1", "Laureat 19", "Laureat 20"], "Parrain 3": ["Laureat 5", "Laureat 18", "Laureat 38", "Laureat 28"], "Parrain 4": ["Laureat 16", "Laureat 2", "Laureat 26", "Laureat 23"], "Parrain 5": ["Laureat 14", "Laureat 38", "Laureat 5", "Laureat 30"], "Parrain 6": ["Laureat 35", "Laureat 22", "Laureat 28", "Laureat 8"], "Parrain 7": ["Laureat 36", "Laureat 28", "Laureat 40", "Laureat 13"], "Parrain 8": ["Laureat 21", "Laureat 25", "Laureat 24", "Laureat 31"], "Parrain 9": ["Laureat 39", "Laureat 16", "Laureat 6", "Laureat 22"], "Parrain 10": ["Laureat 10", "Laureat 5", "Laureat 29", "Laureat 21"], "Parrain 11": ["Laureat 13", "Laureat 10", "Laureat 32", "Laureat 16"], "Parrain 12": ["Laureat 22", "Laureat 27", "Laureat 1", "Laureat 4"], "Parrain 13": ["Laureat 3", "Laureat 9", "Laureat 33", "Laureat 7"], "Parrain 14": ["Laureat 31", "Laureat 13", "Laureat 30", "Laureat 11"], "Parrain 15": ["Laureat 37", "Laureat 35", "Laureat 39", "Laureat 26"], "Parrain 16": ["Laureat 24", "Laureat 30", "Laureat 34", "Laureat 36"], "Parrain 17": ["Laureat 11", "Laureat 19", "Laureat 7", "Laureat 34"], "Parrain 18": ["Laureat 9", "Laureat 20", "Laureat 22", "Laureat 27"], "Parrain 19": ["Laureat 29", "Laureat 39", "Laureat 21", "Laureat 12"], "Parrain 20": ["Laureat 15", "Laureat 14", "Laureat 16", "Laureat 32"], "Parrain 21": ["Laureat 26", "Laureat 6", "Laureat 11", "Laureat 39"], "Parrain 22": ["Laureat 4", "Laureat 8", "Laureat 18", "Laureat 1"], "Parrain 23": ["Laureat 28", "Laureat 29", "Laureat 35", "Laureat 3"], "Parrain 24": ["Laureat 30", "Laureat 32", "Laureat 36", "Laureat 24"], "Parrain 25": ["Laureat 32", "Laureat 26", "Laureat 27", "Laureat 18"], "Parrain 26": ["Laureat 18", "Laureat 33", "Laureat 25", "Laureat 40"], "Parrain 27": ["Laureat 17", "Laureat 24", "Laureat 8", "Laureat 19"], "Parrain 28": ["Laureat 27", "Laureat 37", "Laureat 13", "Laureat 6"], "Parrain 29": ["Laureat 8", "Laureat 34", "Laureat 20", "Laureat 2"], "Parrain 30": ["Laureat 19", "Laureat 7", "Laureat 4", "Laureat 38"], "Parrain 31": ["Laureat 2", "Laureat 40", "Laureat 23", "Laureat 15"], "Parrain 32": ["Laureat 1", "Laureat 21", "Laureat 37", "Laureat 33"], "Parrain 33": ["Laureat 25", "Laureat 12", "Laureat 9", "Laureat 17"], "Parrain 34": ["Laureat 6", "Laureat 11", "Laureat 2", "Laureat 37"], "Parrain 35": ["Laureat 23", "Laureat 17", "Laureat 12", "Laureat 5"], "Parrain 36": ["Laureat 7", "Laureat 4", "Laureat 14", "Laureat 25"], "Parrain 37": ["Laureat 20", "Laureat 31", "Laureat 3", "Laureat 10"], "Parrain 38": ["Laureat 40", "Laureat 3", "Laureat 15", "Laureat 35"], "Parrain 39": ["Laureat 33", "Laureat 36", "Laureat 17", "Laureat 29"], "Parrain 40": ["Laureat 34", "Laureat 23", "Laureat 31", "Laureat 14"]}



        
#for i in dictmeeting.items():
#    for j in i[1]:
#        a=random.randint(1, 4)
#        b=random.randint(1, 4)
#        dictnote[(i[0],j)] = (a,b) 

#print(dictnote)
dictnote={}

#print(sys.argv[1])
a=sys.argv[1]
b=json.loads(a)
#print("_______________")
#print(b)


Lparrain=[]
for p in b:
    Lparrain.append(p["Parrain"])
    
#print(Lparrain)
dictmeeting={p:[] for p in Lparrain}    

for m in b:
    dictmeeting[m["Parrain"]].append(m["Laureat"])

#print(dictmeeting)
nbrparrain=len(dictmeeting)
#print(nbrparrain)

Llaureat=[]
for m in dictmeeting.items():
    for l in m[1]:
        if l not in Llaureat:
            Llaureat.append(l)
            
            
dictmeetinglaureat={k:[] for k in Llaureat}
for m in dictmeeting.items():
    for l in m[1]:
        dictmeetinglaureat[l].append(m[0])

for c in b:
    
    dictnote[(c['Parrain'],c['Laureat'])]=(c['NoteParrain'],c['NoteLaureat'])




for i in dictnote.items():
    dictnote[i[0]]=sum(i[1])


model = cp_model.CpModel()
dictbinome={}


for meeting in dictnote.items():
    
    dictbinome[(meeting[0][0],meeting[0][1],meeting[1])]= model.NewBoolVar('binome_p%sl%sn%i' % (meeting[0][0],meeting[0][1],meeting[1]))
#print(model)
#print(dictbinome)
#print(dictnote)

for p in Lparrain:
    model.Add(sum(dictbinome[(p, l, dictnote[(p,l)])] for l in dictmeeting[p])  == 1)
    
    
for l in Llaureat:
    model.Add(sum(dictbinome[(p, l, dictnote[(p,l)])] for p in dictmeetinglaureat[l]) == 1)
    
model.Maximize(sum(dictnote[(p,l)]*dictbinome[(p,l,dictnote[(p,l)])]for p in Lparrain for l in dictmeeting[p]))

solver = cp_model.CpSolver()

solver.parameters.max_time_in_seconds = 20.0

status = solver.Solve(model)

if status == cp_model.OPTIMAL:
    Lnote=[]
    for p in Lparrain:
        for l in dictmeeting[p]:
            if solver.Value(dictbinome[(p, l, dictnote[(p,l)])])!=0:
                dictresult[p]=l
                Lnote.append(dictnote[p,l])
                
    
    #print("Note moyenne par binôme "+ str(sum(Lnote)/(nbrparrain*2))+ "/4")           
    
else:
    print("error")
    
f = json.dumps(dictresult)
print(f)
