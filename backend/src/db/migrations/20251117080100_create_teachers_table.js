/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex){
    return knex.schema.createTable('teachers', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('name').notNullable();
        table.integer('mobile').notNullable();
        table.timestamps(true, true);
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex){
    return knex.schema.dropTable('teachers');
}
