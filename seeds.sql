    INSERT INTO departments (department_name)
    VALUES ('Service'),('Engineering'),('Finance'),('Legal'),('Sales');


    INSERT INTO roles (roles_role, salary,department_id)
    VALUES ('Sales Lead', 10000,1),
           ('Sales Person', 80000,2),
           ('Lead Engineer', 150000,3),
           ('Account Manager', 160000,5),
           ('Accountant', 25000,4),
           ('Legal Team Lead', 250000,4),
           ('Lawyer', 150000,2);

           INSERT INTO employees (first_name, last_name,manager_id,role_id)
           VALUES                ('John','Smith',NULL,2),
                                 ('Michael','Dave',1,1),
                                 ('Abayomi','Aroyeun',1,4),
                                 ('Tom','Cruise',2,3),
                                 ('Daniel','Wonder',2,5),
                                 ('Sarah','Crooks',1,1),
                                 ('Kelvin','Sunshine',1,4);
