-- BASE DE DATOS
DROP TABLE IF EXISTS test_json;
CREATE TABLE test_json(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    columna_JSON_1 JSON NOT NULL,
    columna_JSON_2 JSON NOT NULL,
    columna_JSON_3 JSON NOT NULL
);
-- CONSULTAS REALIZADAS
INSERT INTO test_json
VALUES(1,
        '{"a": {"b": "2"}}',
        '{"padre": [{"nombre": "Alberto"},{"hijo": "Santiago"}]}',
        '{"employees": {"employee": [{"id": "1", "firstName": "Tom", "lastName": "Cruise"},{"id": "2","firstName": "Maria","lastName": "Sharapova"},{"id": "3","firstName": "Robert","lastName": "Downey Jr."}]}}'
    );
INSERT INTO test_json
VALUES(2,
        '{ "InsuranceCompanies": { "Top Insurance Companies":[ { "No": "1", "Name": "Berkshire Hathaway ( BRK.A)", "Market Capitalization": "$308 billion" } ], "source": "investopedia.com", "Time":"Feb 2019" }}',
        '[
  {
    "name": "Lennart Johansson",
    "city": "Stockholm"
  },
  {
    "name": "Karl Eriksson",
    "city": "London"
  },
  {
    "name": "Pekka Hartikainen",
    "city": "Helsinki"
  },
  {
    "name": "Mia Svensson",
    "city": "Berlin"
  }
]',
        '[
   {
      "title":"Clean kitchen",
      "description":"Don\'t forget the are under the sink!!"
   },
   {
      "title":"Call Eric",
      "description":"Remind him to do his taxes"
   },
   {
      "title":"Water flowers",
      "description":"Don\'t forget the ones in the garden ! "
   }
]');

-- EXTRACT
SELECT JSON_EXTRACT(columna_JSON_1, '$.a.b') AS b_Value FROM test_json WHERE id = 1;
SELECT JSON_EXTRACT(columna_JSON_2, '$[0].name') AS json_value FROM test_json WHERE id = 2;
-- REPLACE
UPDATE test_json SET columna_JSON_2 = JSON_REPLACE(columna_JSON_2, '$.padre[1].hijo', 'Alejandro') WHERE id = 1;
UPDATE test_json SET columna_JSON_3 = JSON_REPLACE(columna_JSON_3, '$[2].description', "Don\'t forget the ones in the garden and the backyard!") WHERE id = 2;
-- REMOVE
UPDATE test_json SET columna_JSON_3 = JSON_REMOVE(columna_JSON_3, '$.employees.employee[1]') WHERE id = 1;
UPDATE test_json SET columna_JSON_3 = JSON_REMOVE(columna_JSON_3, '$[1]') WHERE id = 2;
-- INSERT
SELECT JSON_INSERT(columna_JSON_1, '$.u', '"3"') FROM test_json WHERE id = 1;
SELECT id, JSON_INSERT(columna_JSON_2, '$.padre[2]', '""hijo": "Andrea""') FROM test_json WHERE id = 1;

