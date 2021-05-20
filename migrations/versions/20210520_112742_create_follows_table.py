"""create follows table

Revision ID: 022a1e78c2bf
Revises: 307948a2e966
Create Date: 2021-05-20 11:27:42.227943

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '022a1e78c2bf'
down_revision = '307948a2e966'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('followee_id', sa.Integer(), nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['followee_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('followee_id', 'follower_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # ### end Alembic commands ###