/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex){
    return knex.schema.createTable('parents', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('cascade');
        table.string('name').notNullable();
        table.string('mobile');  
        table.string('address');
        table.timestamps(true, true);
    });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex){
    return knex.schema.dropTable('parents');
}

