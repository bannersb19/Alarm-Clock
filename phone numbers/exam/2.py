list=[]
n=int(input("Enter the limit of the loop: "))
for i in range(0,n):
    x=input("Enter the value of the elements: ")
    list.append(x)

for j in list:
    l=len(i)
    if(l>=2 and i[0]==i[-1]):
        ctr=ctr+1

print("Expected result: ",ctr)
