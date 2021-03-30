"""create lists table

Revision ID: 21f674e3839f
Revises: a1b6271dae21
Create Date: 2021-03-30 14:14:59.709846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21f674e3839f'
down_revision = 'a1b6271dae21'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lists')
    # ### end Alembic commands ###