/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('marks', (table) => {
        table.increments('id').primary();
        table.integer('student_id').references('roll_no').inTable('students').onDelete('cascade');    
        table.integer('telugu');
        table.integer('hindi');
        table.integer('english');
        table.integer('maths');
        table.integer('science');
        table.integer('social');
        table.integer('total');
        table.integer('percentage');
        table.timestamps(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('marks');
};
