IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200705180943_Inicial')
BEGIN
    CREATE TABLE [EnderecosLinks] (
        [IdEnderecoLink] int NOT NULL IDENTITY,
        [Nome] nvarchar(100) NOT NULL,
        [URL] nvarchar(200) NOT NULL,
        [QTDClicks] int NOT NULL,
        [DTCriacao] datetime2 NOT NULL,
        CONSTRAINT [PK_EnderecosLinks] PRIMARY KEY ([IdEnderecoLink])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200705180943_Inicial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200705180943_Inicial', N'3.1.5');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707125902_InitialCreate')
BEGIN
    CREATE TABLE [Grupos] (
        [IdGrupo] int NOT NULL IDENTITY,
        [idEnderecoLink] int NOT NULL,
        [Nome] nvarchar(100) NOT NULL,
        [URL] nvarchar(200) NOT NULL,
        [QTDClicks] int NOT NULL,
        [DTCriacao] datetime2 NOT NULL,
        [EnderecoLinkIdEnderecoLink] int NULL,
        CONSTRAINT [PK_Grupos] PRIMARY KEY ([IdGrupo]),
        CONSTRAINT [FK_Grupos_EnderecosLinks_EnderecoLinkIdEnderecoLink] FOREIGN KEY ([EnderecoLinkIdEnderecoLink]) REFERENCES [EnderecosLinks] ([IdEnderecoLink]) ON DELETE NO ACTION
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707125902_InitialCreate')
BEGIN
    CREATE INDEX [IX_Grupos_EnderecoLinkIdEnderecoLink] ON [Grupos] ([EnderecoLinkIdEnderecoLink]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707125902_InitialCreate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200707125902_InitialCreate', N'3.1.5');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707130337_ExclusaoIdLinkGrupo')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Grupos]') AND [c].[name] = N'idEnderecoLink');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Grupos] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Grupos] DROP COLUMN [idEnderecoLink];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707130337_ExclusaoIdLinkGrupo')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200707130337_ExclusaoIdLinkGrupo', N'3.1.5');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707154902_AddOrdemGrupo')
BEGIN
    ALTER TABLE [Grupos] ADD [Ordem] int NOT NULL DEFAULT 0;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200707154902_AddOrdemGrupo')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200707154902_AddOrdemGrupo', N'3.1.5');
END;

GO

