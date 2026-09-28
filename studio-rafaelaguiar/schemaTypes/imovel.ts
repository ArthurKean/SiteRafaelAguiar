import {defineArrayMember, defineField, defineType} from 'sanity'

export const imovelType = defineType({
  name: 'imovel',
  title: 'Imóveis',
  type: 'document',

  fields: [
    defineField({name: 'ativo', title: 'Exibir no site', type: 'boolean', initialValue: true}),
    defineField({name: 'descricaoCurta', title: 'Descrição curta', type: 'string'}),
    defineField({name: 'tipo', title: 'Tipo de imóvel', type: 'string', options: {list: ['Apartamento', 'Cobertura', 'Casa', 'Terreno', 'Comercial']}}),
    defineField({name: 'status', title: 'Etapa do empreendimento', type: 'string', options: {list: ['Lançamento', 'Em construção', 'Na planta', 'Pronto para morar']}}),
    defineField({name: 'construtora', title: 'Construtora', type: 'string'}),
    defineField({name: 'suites', title: 'Suítes', type: 'number', validation: r => r.integer().min(0)}),
    defineField({name: 'descricaoSuites', title: 'Configuração das suítes', description: 'Ex.: 2 suítes + 1 reversível', type: 'string'}),
    defineField({name: 'vagas', title: 'Vagas de garagem', type: 'number', validation: r => r.integer().min(0)}),
    defineField({name: 'precoMaximo', title: 'Preço máximo (R$)', description: 'Opcional quando há mais de uma opção de unidade.', type: 'number', validation: r => r.min(0)}),
    defineField({name: 'areaMaxima', title: 'Área máxima (m²)', type: 'number', validation: r => r.min(0)}),
    defineField({name: 'entrega', title: 'Previsão de entrega', type: 'date'}),
    defineField({name: 'entorno', title: 'Sobre a localização', type: 'text', rows: 3}),
    defineField({name: 'mapaUrl', title: 'Link do Google Maps', type: 'url'}),
    defineField({name: 'mapaEmbedUrl', title: 'URL de incorporação do Google Maps', description: 'Cole somente a URL do atributo src do iframe.', type: 'url', validation: r => r.custom(value => !value || /^https:\/\/(?:(?:www\.)?google\.com\/maps\/embed(?:[/?]|$)|maps\.google\.com\/maps\?)/.test(value) || 'Use uma URL https://www.google.com/maps/embed...')}),
    defineField({name: 'coordenadas', title: 'Coordenadas', type: 'geopoint'}),
    defineField({name: 'comodidades', title: 'Lazer e diferenciais', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'demonstracao', title: 'Cadastro de demonstração', description: 'Impede o uso das fotos no carrossel principal.', type: 'boolean', initialValue: false}),
    defineField({name: 'plantas', title: 'Opções de metragem e unidades', type: 'array', of: [defineArrayMember({name: 'planta', title: 'Opção', type: 'object', fields: [
      defineField({name: 'area', title: 'Área privativa (m²)', type: 'number', validation: r => r.required().positive()}),
      defineField({name: 'preco', title: 'Preço (R$)', type: 'number', validation: r => r.required().min(0)}),
      defineField({name: 'quartos', title: 'Quartos', type: 'number', validation: r => r.integer().min(0)}),
      defineField({name: 'suites', title: 'Suítes', type: 'number', validation: r => r.integer().min(0)}),
      defineField({name: 'descricaoSuites', title: 'Configuração das suítes', type: 'string'}),
      defineField({name: 'banheiros', title: 'Banheiros', type: 'number', validation: r => r.integer().min(0)}),
      defineField({name: 'unidade', title: 'Código da unidade', type: 'string'}),
      defineField({name: 'orientacao', title: 'Posição solar', type: 'string'}),
      defineField({name: 'imagem', title: 'Desenho da planta', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Descrição da imagem', type: 'string'})]}),
    ], preview: {select: {area: 'area', unidade: 'unidade'}, prepare: ({area, unidade}) => ({title: `${area ?? ''} m²`, subtitle: unidade})}})]}),

    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Link do imóvel',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'preco',
      title: 'Preço inicial (R$)',
      description: 'Informe em reais. Ex.: 1308744.15 para R$ 1.308.744,15.',
      validation: r => r.required().min(0),
      type: 'number',
    }),

    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'cidade',
      title: 'Cidade',
      initialValue: 'São Luís',
      type: 'string',
    }),

    defineField({
      name: 'bairro',
      title: 'Bairro',
      type: 'string',
    }),

    defineField({
      name: 'quartos',
      title: 'Quartos',
      type: 'number',
    }),

    defineField({
      name: 'banheiros',
      title: 'Banheiros',
      type: 'number',
    }),

    defineField({
      name: 'area',
      title: 'Área mínima (m²)',
      validation: r => r.required().positive(),
      type: 'number',
    }),

    defineField({
      name: 'imagemPrincipal',
      validation: r => r.required(),
      fields: [defineField({name: 'alt', title: 'Descrição da imagem', type: 'string'})],
      title: 'Imagem principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'galeria',
      title: 'Galeria de fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [defineField({name: 'alt', title: 'Descrição da imagem', type: 'string'})],
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: 'destaque',
      title: 'Imóvel em destaque',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})