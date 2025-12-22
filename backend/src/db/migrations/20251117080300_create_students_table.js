
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex){
    return knex.schema.createTable('students', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('cascade');
        table.integer('parent_id').references('id').inTable('parents').onDelete('SET NULL');
        table.integer('class_id').references('id').inTable('classes').onDelete('SET NULL');
        table.string('name').notNullable();
        table.integer('roll_no').notNullable().unique();
        table.date('dob');
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex){
    return knex.schema.dropTable('students');
}
