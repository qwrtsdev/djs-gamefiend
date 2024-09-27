const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alert')
        .setDescription('สร้างประกาศเล็กในช่องสนทนา')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addStringOption(option =>
            option.setName('messages')
                .setDescription('ข้อความที่ต้องการแสดงผล (บังคับ)')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('บทบาทที่ต้องการกล่าวถึง')
        )
        .addStringOption(option =>
            option.setName('colors')
                .setDescription('สีที่ต้องการแสดงผล (ค่าเริ่มต้น: สีขาว)')
                .addChoices([
                    {
                        name: 'Red',
                        value: '1',
                    },
                    {
                        name: 'Green',
                        value: '2',
                    },
                    {
                        name: 'Blue',
                        value: '3',
                    },
                    {
                        name: 'Yellow',
                        value: '4',
                    },
                ])
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: ':exclamation: คุณไม่มีสิทธิ์ใช้คำสั่งนี้',
                ephemeral: true
            });
        }

        const messages = interaction.options.getString('messages');
        const role = interaction.options.getRole('role') ?? undefined;
        const colors = interaction.options.getString('colors');

        let embedColor = ''
        switch (colors) {
            case '1':
                embedColor = '#ff513d';
                break;
            case '2':
                embedColor = '#a9ff47';
                break;
            case '3':
                embedColor = '#4797ff';
                break;
            case '4':
                embedColor = '#ffce47';
                break;
            default:
                embedColor = '#ffffff';
                break;
        }
        const annouceEmbed = new EmbedBuilder()
            .setColor(`${embedColor}`)
            .setDescription(messages)

        try {
            await interaction.reply({
                content: ':white_check_mark: success to execute.',
                ephemeral: true
            })
            await interaction.channel.send({
                content: `${role}`,
                embeds: [annouceEmbed]
            })
        } catch (error) {
            await interaction.send({
                content: ':exclamation: เกิดปัญหาระหว่างใช้คำสั่งนี้!',
                ephemeral: true
            })
        }
    }
}