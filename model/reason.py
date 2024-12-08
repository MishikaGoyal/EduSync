from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['Data'] 
collection = db['predicted_results'] 

def check_conditions(record):
    total_teachers = int(record.get("Total Teachers", 0))
    total_students = int(record.get("Total Students", 0))
    separate_room_for_hm = int(record.get("Separate Room for HM", 0))
    grade_configuration_str = record.get("Grade Configuration", "(0,0)")
    grade_configuration = tuple(map(int, grade_configuration_str.strip("()").split(',')))
    school_type = int(record.get("School Type", 0))
    total_washrooms_str = record.get("Total Washrooms", "(0,0)")
    total_washrooms = tuple(map(int, total_washrooms_str.strip("()").split(',')))
    boundary_wall = int(record.get("Boundary Wall", 0))
    library_available = int(record.get("Library Available", 0))
    drinking_water_available = int(record.get("Drinking Water Available", 0))
    playground_available = int(record.get("Playground Available", 0))
    electricity_availability = int(record.get("Electricity Availability", 0))
    total_classrooms = int(record.get("Total Class Rooms", 0))

    print (record)

    lists=[]

    if (total_teachers * 40 < total_students):
        s= f'There should be 1 teacher per 40 students. You have {total_teachers} teachers and {total_students} students.'
        lists.append(s)
    if (separate_room_for_hm != 1 ):
        lists.append('There should be a seperate room for headmaster/headmistress.')
    if (grade_configuration not in [(1, 5), (1,8), (1, 10), (1, 12), (6,8), (6, 10), (6,12), (9,10), (9,12), (11,12)] ):
        lists.append('Your school does not follow grade configuration norm.')
    if (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) :
        s= f'There should be seperate washroom for boys and girls. You have {total_washrooms[0]} for boys and {total_washrooms[1]} for girls.'
        lists.append(s)
    if (boundary_wall != 1 ):
        lists.append('There should be a pucca boundary wall.')
    if (library_available != 1) :
        lists.append('There should be a library.')
    if (drinking_water_available != 1): 
        lists.append('Drinking Water should be available.')
    if (playground_available != 1 ):
        lists.append('There should be a playground.')
    if (electricity_availability != 1 ):
        lists.append('Electricity should be available.')
    if (total_classrooms < total_teachers):
        s=  f'Each teacher should have one classroom. You have {total_teachers} teachers and {total_classrooms} classrooms.'
        lists.append(s)
    else:
        lists.append('Your school is Standard Structure.')
    
    return lists

for record in collection.find():
    lists = check_conditions(record)
    for i in lists:
        print(i)
    
