# PharmaCore-TS 
## Descripción
PharmaCore es una aplicación robusta diseñada para gestionar eficientemente recetas médicas, perfiles de pacientes, inventario de medicamentos y ventas, asegurando la integridad y la seguridad de los datos de salud.

## sprint 1

1. Diagrama UML

![Texto alternativo](./images/Diagrama_UML.jpg)

2. Diagrama Entidad Relacion

![Texto alternativo](./images/Diagrama_Entidad_Relacion.jpeg)

3. Creacion de bases de datos (mysql o postgresql)
```sql
CREATE DATABASE `railway` 


-- railway.doctors definition

CREATE TABLE `doctors` (
  `id_doctor` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id_doctor`)
) 


-- railway.medicines definition

CREATE TABLE `medicines` (
  `id_medicine` int NOT NULL AUTO_INCREMENT,
  `name_medicine` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `form` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `prescription` tinyint(1) NOT NULL,
  `quantity_stock` int NOT NULL,
  `unit_cost` int NOT NULL,
  PRIMARY KEY (`id_medicine`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;


-- railway.patients definition

CREATE TABLE `patients` (
  `id_patient` varchar(10) COLLATE utf8mb4_persian_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `birth_date` datetime NOT NULL,
  `known_allergies` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `insurance_number` int DEFAULT NULL,
  PRIMARY KEY (`id_patient`)
) 


-- railway.roles definition

CREATE TABLE `roles` (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) 


-- railway.text_ocr definition

CREATE TABLE `text_ocr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(8000) NOT NULL,
  PRIMARY KEY (`id`)
) 


-- railway.prescriptions definition

CREATE TABLE `prescriptions` (
  `id_prescription` int NOT NULL AUTO_INCREMENT,
  `id_patient` varchar(10) COLLATE utf8mb4_persian_ci NOT NULL,
  `id_doctor` int NOT NULL,
  `issue_date` datetime NOT NULL,
  PRIMARY KEY (`id_prescription`),
  KEY `recetas_pacientes_FK` (`id_patient`),
  KEY `recetas_medicos_FK` (`id_doctor`),
  CONSTRAINT `prescriptions_doctors_FK` FOREIGN KEY (`id_doctor`) REFERENCES `doctors` (`id_doctor`),
  CONSTRAINT `prescriptions_patients_FK` FOREIGN KEY (`id_patient`) REFERENCES `patients` (`id_patient`)
) 


-- railway.sales definition

CREATE TABLE `sales` (
  `id_sale` int NOT NULL AUTO_INCREMENT,
  `id_patient` varchar(10) COLLATE utf8mb4_persian_ci NOT NULL,
  `date_time` date NOT NULL,
  `sale_total_cost` double DEFAULT NULL,
  PRIMARY KEY (`id_sale`),
  KEY `ventas_pacientes_FK` (`id_patient`),
  CONSTRAINT `sales_patients_FK` FOREIGN KEY (`id_patient`) REFERENCES `patients` (`id_patient`)
) 


-- railway.users definition

CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `id_role` int NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `users_roles_FK` (`id_role`),
  CONSTRAINT `users_roles_FK` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`)
) 


-- railway.prescription_items definition

CREATE TABLE `prescription_items` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `id_prescription` int NOT NULL,
  `id_medicine` int NOT NULL,
  `quantity` int NOT NULL,
  `usage_instructions` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id_item`),
  KEY `item_prescriptions_prescriptions_FK` (`id_prescription`),
  KEY `item_prescriptions_medicines_FK` (`id_medicine`),
  CONSTRAINT `item_prescriptions_medicines_FK` FOREIGN KEY (`id_medicine`) REFERENCES `medicines` (`id_medicine`),
  CONSTRAINT `item_prescriptions_prescriptions_FK` FOREIGN KEY (`id_prescription`) REFERENCES `prescriptions` (`id_prescription`)
) 


-- railway.sale_items definition

CREATE TABLE `sale_items` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `id_sale` int NOT NULL,
  `id_medicine` int NOT NULL,
  `quantity` int NOT NULL,
  `total_cost_item` double DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  KEY `item_sales_sales_FK` (`id_sale`),
  KEY `item_sales_medicines_FK` (`id_medicine`),
  CONSTRAINT `item_sales_medicines_FK` FOREIGN KEY (`id_medicine`) REFERENCES `medicines` (`id_medicine`),
  CONSTRAINT `item_sales_sales_FK` FOREIGN KEY (`id_sale`) REFERENCES `sales` (`id_sale`)
) 
```
4. Bases de datos desplegada en render.com 

   ![Texto alternativo](./images/Base_de_datos_desplegada.png)

5. Proyecto de node creado en github
[Link Repositorio](https://github.com/marcelaW40k/PharmaCore-TS)

6. Colección de Postman creada con los endpoints a usar

```json
	
```


