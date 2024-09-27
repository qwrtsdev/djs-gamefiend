const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('เลือกผู้ใช้งานที่ต้องการแบน พร้อมเหตุผล')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addUserOption(option =>
            option.setName('target')
                .setDescription('เลือกผู้ใช้งาน')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('สาเหตุการแบน (ไม่บังคับ)')
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: ':exclamation: คุณไม่มีสิทธิ์ใช้คำสั่งนี้',
                ephemeral: true
            });
        }

        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'ไม่ได้ระบุไว้';

        await interaction.reply(`แบน ${target.username} แล้ว! สาเหตุ : ${reason}`)
        await interaction.guild.members.kick(target);
    }
}