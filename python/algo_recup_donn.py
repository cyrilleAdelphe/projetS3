# -*- coding: utf-8 -*-
"""
Created on Fri Nov  8 10:31:33 2019

@author: tagna
"""

eatCount = []
libido = []
health = []
#lifeSpan = []
f = open("C:/Users/tagna/Documents/Travail_2a/Projet_S3_Ozzo/state.txt","r") 

for line in f :
    i = line.find ("eatCount")
    j = line.find ("libido")
    k = line.find ("health")
#    l = line.find ("lifeSpan")
    
    if line[i+10] == "n" :
        eatCount.append(0)
    if line[j+8] == "n" :
        libido.append(0)
    if line[k+8] == "n" :
        health.append(0)
#    if line[l+138] == "n" :
#        lifeSpan.append(0)
    
        
    if line[i+11].isnumeric() and line[i+12].isnumeric()!= True:
        eatCount.append(int(line[i+10] + line[i+11]))
    elif line[i+12].isnumeric():
        eatCount.append(int(line[i+10] + line[i+11] + line[i+12]))
    else :
        eatCount.append(int(line[i+10]))
        
    if line[j+9].isnumeric() and line[j+10].isnumeric()!= True:
        libido.append(int(line[j+8] + line[j+9]))
    elif line[j+10].isnumeric():
        libido.append(int(line[j+8] + line[j+9] + line[j+10]))
    else :
        libido.append(int(line[j+8]))

    if line[k+9].isnumeric() and line[k+10].isnumeric()!= True:
        health.append(int(line[k+8] + line[k+9]))
    elif line[k+10].isnumeric():
        health.append(int(line[k+8] + line[k+9] + line[k+10]))
    else :
        health.append(int(line[k+8]))  
        
        
#    if line[l+139].isnumeric() and line[l+140].isnumeric()!= True:
#        lifeSpan.append(int(line[l+138] + line[l+139]))
#    elif line[l+140].isnumeric() and line[l+141].isnumeric()!=True:
#        lifeSpan.append(int(line[l+138] + line[l+139] + line[l+140]))
#    else :
#        lifeSpan.append(int(line[l+138]))      
	
print(eatCount)
print(libido)
print(health)
#print(lifeSpan)

f.close()
